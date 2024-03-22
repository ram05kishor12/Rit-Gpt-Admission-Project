"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, UserRoundCheck } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";
import { useRouter } from "next/navigation";


function Navbar({ cont, admin }: { cont: boolean, admin: boolean }) {
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const router = useRouter();

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
            <div className="flex items-center  bg-white p-2 ">
                {!cont && (<MobileSidebar />)}
                <div className="flex justify-center px-8 md:justify-start xl:justify-start lg:justify-start w-full md:w-auto">
                    <h1 className=" flex text-2xl px-5 text-slate-900 font-semibold">RIT <span className="text-blue-600 px-2">GPT</span></h1>
                </div>
                <div className={isLargeScreen ? "flex justify-end w-full px-8" : "flex justify-start"}>
                    {!cont && isLargeScreen ? (
                        <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
                            <UserRoundCheck />
                        </Button>

                    ) : (
                        admin ? <></> :
                            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
                                <UserRoundCheck />
                            </Button>



                    )}
                </div>
            </div>
            <div className="bg-gray-200 h-[1.5px] w-full"></div>
        </>

    );
};

export default Navbar;

