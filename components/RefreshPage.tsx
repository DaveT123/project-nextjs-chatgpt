"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    chatId: string;
};

// temporary fix to refresh page
function RefreshPage({ chatId }: Props) {
    const router = useRouter();

    useEffect(() => {
        const reloadCount = sessionStorage.getItem(chatId);

        if (!reloadCount) {
            sessionStorage.setItem(chatId, "reloaded");
            const reloadCount = sessionStorage.getItem("reloadCount");
            router.replace(`/chat/${chatId}`);
        }
    }, []);

    return null;
}

export default RefreshPage;
