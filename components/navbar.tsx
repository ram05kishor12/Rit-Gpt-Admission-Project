import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
    return (
        <div className="flex items-center  bg-gray-300 p-3 shadow-xl">
            <MobileSidebar />
            <h1 className="text-3xl text-slate-900 font-bold px-7">RIT-BOT</h1>
        </div>
    )
}

export default Navbar;