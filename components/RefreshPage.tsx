"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// temporary fix to refresh page
function RefreshPage() {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, []);

    return null;
}

export default RefreshPage;
