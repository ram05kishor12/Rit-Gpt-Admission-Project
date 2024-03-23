"use client";
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';


export default function Reload() {


    const handleButtonClick = () => {
        window.location.reload();
    }

    return (
        <Button className=" w-56  animate-fade-in hover:transform hover:scale-105 transition-transform text-white hover:bg-blue-950 shadow-lg bg-blue-600" onClick={handleButtonClick}>
            <Link href="/">
                <div className=" flex gap-1 text-lg">
                    <Plus className="w-5 h-7" />
                    New Chat
                </div>
            </Link>
        </Button>
    )
}

