"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, UserRoundCheck } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";
import { Inter } from "next/font/google";
import Link from "next/link";


const Navbar = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    // Function to detect screen size and set state accordingly
    const handleResize = () => {
        if (window.innerWidth > 768) { // Change the value 768 as per your design
            setIsLargeScreen(true);
        } else {
            setIsLargeScreen(false);
        }
    };

    // Listen to window resize events
    useEffect(() => {
        handleResize(); // Call on mount to set initial screen size
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="flex items-center justify-between bg-gray-50 p-4 shadow-lg">
            <MobileSidebar />
            <div className="flex items-center justify-center md:justify-start w-full md:w-auto">
                <h1 className="text-2xl text-slate-900 font-semibold">RIT <span className="text-blue-600">GPT</span></h1>
            </div>
            <div className={isLargeScreen ? "block" : "hidden md:block"}>
                {isLargeScreen ? (
                    <Button variant="ghost" size="icon">
                        <UserRoundCheck />
                    </Button>

                ) : (
                    <Menu />
                )}
            </div>
        </div>
    );
};

export default Navbar;

