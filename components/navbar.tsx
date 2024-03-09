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
        <>
            <div className="flex items-center  bg-white p-2 shadow-lg">
                <MobileSidebar />
                <div className="flex justify-center md:justify-start xl:justify-start lg:justify-start w-full md:w-auto">
                    <h1 className=" flex text-2xl px-5 text-slate-900 font-semibold">RIT <span className="text-blue-600 px-2">GPT</span></h1>
                </div>
                <div className={isLargeScreen ? "flex justify-end w-full" : "hidden md:block"}>
                    {isLargeScreen ? (
                        <Button variant="ghost" size="icon">
                            <UserRoundCheck />
                        </Button>

                    ) : (
                        <Menu />
                    )}
                </div>
            </div>
            <div className="bg-gray-200 h-[0.7px] w-full"></div>
        </>

    );
};

export default Navbar;

