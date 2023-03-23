"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Login() {
    return (
        <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
            <Image
                src="chatgpt-icon.svg"
                width={400}
                height={400}
                alt="logo"
                priority={true}
            />
            <button
                className="text-white font-bold text-6xl animate-pulse"
                onClick={() => signIn("google")}
            >
                Click to Sign In
            </button>
        </div>
    );
}
