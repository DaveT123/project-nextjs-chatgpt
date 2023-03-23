"use client";

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";
import SideBar from "./SideBar";

type Props = {
    chatId: string;
};

function ChatInput({ chatId }: Props) {
    const [prompt, setPrompt] = useState("");
    const { data: session } = useSession();

    const { data: model, mutate: setModel } = useSWR("model", {
        fallbackData: "gpt-3.5-turbo",
    });

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt) return;

        const input = prompt.trim();
        setPrompt("");

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar:
                    session?.user?.image! ||
                    `https://ui-avatars.com/api/?name=${session?.user?.name}`,
                role: "user",
            },
        };

        await addDoc(
            collection(
                db,
                "users",
                session?.user?.email!,
                "chats",
                chatId,
                "messages"
            ),
            message
        );

        // Toast notification to show loading
        const notification = toast.loading("ChatGPT is thinking...");

        try {
            const response = await fetch("/api/askQuestion", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: input,
                    chatId,
                    model,
                    session,
                }),
            });

            // Toast notification to show successful
            toast.success("ChatGPT has replied!", {
                id: notification,
            });
        } catch (err: any) {
            console.error(`Error occurred: ${err.message}`);
            toast.error("ChatGPT was unable to respond!", {
                id: notification,
            });
        }
    };

    const handleKeyPress = (event: any) => {
        if (event.keyCode === 13 && event.shiftKey != true) {
            sendMessage(event);
        }
    };

    return (
        <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
            <div className="sm:hidden">
                <ModelSelection />
            </div>

            <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
                <textarea
                    className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300 whitespace-pre-wrap overflow-auto md:h-24 h-10"
                    disabled={!session}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message here..."
                />
                <button
                    disabled={!prompt || !session}
                    type="submit"
                    className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
                </button>
            </form>
        </div>
    );
}

export default ChatInput;
