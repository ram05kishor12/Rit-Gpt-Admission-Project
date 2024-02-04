"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "@/components/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsOpen(true);
    }, []);

    if (!isOpen) {
        return null;
    }
    return (
        <Sheet >
            <SheetTrigger className="">
                <Button variant="ghost" size="icon"
                    className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[300px]">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;