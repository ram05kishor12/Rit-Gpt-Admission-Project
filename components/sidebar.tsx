import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Logo from "../public/logo.jpg";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { Globe } from "lucide-react";

const montserrat = Poppins({
  weight: "600",
  subsets: ["latin"],
});

function Sidebar() {
  return (
    <div className="sidebar h-screen  w-300px md:w-[300px] lg:w-[300px] overflow-y-scroll text-center bg-zinc-100   shadow-sm">
      <Image
        className="mx-5 mt-5 rounded-md"
        src={Logo}
        alt="logo"
        width={250}
        height={300}
        placeholder="blur"
      />
      <div className="bg-gray-200 h-[0.5px] w-[300px] my-3"></div>
      <div className="text-white text-2xl font-bold py-2">
        <Button className=" w-56  animate-fade-in hover:transform hover:scale-105 transition-transform text-white hover:bg-blue-950 shadow-lg bg-blue-600">
          <Link href="/">
            <div className=" flex gap-1 text-lg">
              <Plus className="w-5 h-7" />
              New Chat
            </div>
          </Link>
        </Button>
      </div>
      <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300">
        <span className="text-[13px] ml-4 text-blue-700 font-bold">
          Suggestions
        </span>
      </div>
      <div className="p-2.5 mt-1 flex items-center rounded-md px-5 duration-300 cursor-pointer hover:px-8 ">
        <i className="bi bi-house-door-fill"></i>
        <span className="text-[14px] ml-4 text-black font-bold">Why RIT ?</span>
      </div>
      <div className="p-2.5 mt-1 flex items-center rounded-md px-5 duration-300 cursor-pointer hover:px-8">
        <i className="bi bi-house-door-fill"></i>
        <span className="text-[14px] ml-4 text-black font-bold">
          Courses Offered
        </span>
      </div>
      <div className="p-2.5 mt-1 flex items-center rounded-md px-5 duration-300 cursor-pointer hover:px-8">
        <span className="text-[14px] ml-4 text-black font-bold">
          Our Achievements
        </span>
      </div>
      <div className="bg-gray-200 h-[0.5px] w-[300px] my-5"></div>
      <div className="text-white text-xl font-bold">
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300">
          <span className="text-[13px] ml-4 text-blue-600 font-bold">
            Contact Details
          </span>
        </div>
        <div className="p-2.5 flex items-center rounded-md mx-3 duration-300 cursor-pointer">
          <span className="flex gap-2 text-[13px] ml-4 text-black font-medium">
            {" "}
            <Phone className="w-5 h-7" /> 90509479540{" "}
          </span>
        </div>
        <div className="p-2.5 flex items-center rounded-md mx-3 duration-300 cursor-pointer">
          <a
            href="mailto:mailritchennai.edu.in"
            className="flex gap-2 text-[13px] ml-4 text-black font-medium"
          >
            <Mail className="w-5 h-7" /> mail@ritchennai.edu.in{" "}
          </a>
        </div>
        <div className="p-2.5 flex items-center rounded-md mx-3 duration-300 cursor-pointer">
          <i className="bi bi-house-door-fill"></i>
          <a
            href="https://www.ritchennai.org"
            className="flex gap-2 text-[13px] ml-4 text-black font-medium"
          >
            <Globe className="w-5 h-7" /> ritchennai.org{" "}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
