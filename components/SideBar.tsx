"use client";

import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import NewChat from "./NewChat";

export default function SideBar() {
    const { data: session } = useSession();

    const [chats, loading, error] = useCollection(
        session &&
            query(
                collection(db, "users", session?.user?.email!, "chats"),
                orderBy("createdAt", "asc")
            )
    );
    // console.log(chats?.docs);

    return (
        <div className="p-2 flex flex-col h-full">
            <div className="flex-1">
                <div>
                    <NewChat />
                    <div className="hidden sm:inline">
                        <ModelSelection />
                    </div>

                    <div className="flex flex-col space-y-2 my-2">
                        {loading && (
                            <div className="animate-pulse text-center text-white">
                                <p>Loading Chats...</p>
                            </div>
                        )}
                        {/* Map through the ChatRows */}
                        {chats?.docs.map((chat) => (
                            <ChatRow key={chat.id} id={chat.id} />
                        ))}
                    </div>
                </div>
            </div>

            {session && (
                <button
                    className="border-gray-700 border chatRow cursor-pointer mb-2 hover:opacity-50"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    Logout
                </button>
            )}
        </div>
    );
}
