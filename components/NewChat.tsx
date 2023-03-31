"use client";

import { db } from "@/firebase";
import { PlusIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NewChat() {
    const router = useRouter();
    const { data: session } = useSession();

    const delay = (time: number) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };

    const createNewChat = async () => {
        const doc = await addDoc(
            collection(db, "users", session?.user?.email!, "chats"),
            {
                messages: [],
                userId: session?.user?.email!,
                createdAt: serverTimestamp(),
            }
        );

        await delay(2000);
        router.push(`/chat/${doc.id}`);
    };

    return (
        <div
            className="border-gray-700 border chatRow justify-center"
            onClick={createNewChat}
        >
            <PlusIcon className="h-4 w-4" />
            <p>New Chat</p>
        </div>
    );
}
