import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
    return (<>
        <div className="flex items-center  bg-gray-50  p-3 shadow-2xl shadow-black">
            <MobileSidebar />
            <h1 className="text-3xl text-slate-900 font-extrabold px-10 py-2">Chat AI</h1>
        </div>
        
    </>
    )
}

export default Navbar;