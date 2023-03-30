"use client";

import { useState } from "react";
import SideBar from "./SideBar";

function CollapseSideBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const displayMenu = isMenuOpen ? "block" : "hidden";

    return (
        <div className="z-10">
            <div
                className="focus:outline-none w-screen py-3 text-sm text-bold text-left text-white bg-gray-400/50 transition duration-150 ease-in-out sm:hidden"
                onClick={toggleMenu}
            >
                <span className="inline-block mr-1 text-xl px-4">Menu</span>
            </div>

            <div
                className={`absolute z-1 w-full bg-[#202123] shadow-lg ${displayMenu}`}
                id="menu"
            >
                <SideBar />
            </div>
        </div>
    );
}

export default CollapseSideBar;
