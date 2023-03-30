"use client";

import { db } from "@/firebase";
import { PlusIcon } from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NewChat() {
    const router = useRouter();
    const { data: session } = useSession();

    const createNewChat = async () => {
        const doc = await addDoc(
            collection(db, "users", session?.user?.email!, "chats"),
            {
                messages: [],
                userId: session?.user?.email!,
                createdAt: serverTimestamp(),
            }
        );

        router.push(`/chat/${doc.id}`);
        router.refresh();
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
