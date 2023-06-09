"use client";

import { db } from "@/firebase";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
    id: string;
};

function ChatRow({ id }: Props) {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();
    const [active, setActive] = useState(false);

    const [messages] = useCollection(
        session &&
            query(
                collection(
                    db,
                    "users",
                    session?.user?.email!,
                    "chats",
                    id,
                    "messages"
                ),
                orderBy("createdAt", "asc")
            )
    );

    useEffect(() => {
        if (!pathname) return;

        setActive(pathname.includes(id));
    }, [pathname, id]);

    const removeChat = async () => {
        const docRef = doc(db, "users", session?.user?.email!, "chats", id);
        await deleteFirebaseDocAndSubcollections(docRef);

        router.replace("/");
    };

    const deleteFirebaseDocAndSubcollections = async (docRef: any) => {
        // Delete the document itself
        await deleteDoc(docRef);

        // Get message subcollection of the document
        const subcollection = await collection(docRef, "messages");
        const subcollectionDocs = await getDocs(subcollection);

        // Recursively delete message subcollection and its documents
        for (const subcollectionDoc of subcollectionDocs.docs) {
            const subcollectionDocRef = doc(subcollection, subcollectionDoc.id);
            await deleteDoc(subcollectionDocRef);
        }
    };

    return (
        <Link
            href={`/chat/${id}`}
            className={`chatRow ${active && "bg-gray-700/50"}`}
        >
            <ChatBubbleLeftIcon className="h-5 w-5" />
            <p className="flex-1 sm:hidden md:inline-flex truncate">
                {messages?.docs[messages?.docs.length - 1]?.data().text ||
                    "New Chat"}
            </p>
            <TrashIcon
                className="h-5 w-5 text-gray-700 hover:text-red-700"
                onClick={removeChat}
            />
        </Link>
    );
}

export default ChatRow;
