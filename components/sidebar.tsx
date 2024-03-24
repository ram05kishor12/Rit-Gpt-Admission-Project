"use client"
import React from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Logo from "../public/logo.jpg";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { Globe } from "lucide-react";
import Reload from "./reload";
import { useContext } from "react";
import ChatContext from "./chatprovider";

const montserrat = Poppins({
  weight: "600",
  subsets: ["latin"],
});

function Sidebar() {
  const { handleSubmit, setInput } = useContext(ChatContext);

  return (
    <div className="sidebar h-screen overflow-x-auto w-300px md:w-[300px] lg:w-[300px] overflow-y-auto text-center bg-zinc-100   shadow-sm">
      <Image
        className="mx-5 mt-5 rounded-md"
        src={Logo}
        alt="logo"
        width={250}
        height={300}
        placeholder="blur"
      />
      <div className="bg-gray-200 h-[1.3px] w-[300px] my-3"></div>
      <div className="text-white text-2xl font-bold py-2">
        <Reload />
      </div>
      <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300">
        <span className="text-[13px] ml-4 text-blue-700 font-bold">
          Suggestions
        </span>
      </div>
      <div className="p-2.5 mt-1 flex items-center rounded-md px-5 duration-300 cursor-pointer hover:px-8 ">
        <i className="bi bi-house-door-fill"></i>
        <form onSubmit={handleSubmit}>
          <button className="text-[14px] ml-4 text-black font-bold" onClick={(e) => { setInput("WHY RIT?"); }} type="submit">
            Why RIT?
          </button>
        </form>
      </div>
      <div className="p-2.5 mt-1 flex items-center rounded-md px-5 duration-300 cursor-pointer hover:px-8" >
        <i className="bi bi-house-door-fill"></i>
        <form onSubmit={handleSubmit}>
          <button className="text-[14px] ml-4 text-black font-bold" onClick={(e) => { setInput("courses offered in rit"); }} type="submit">
            Courses Offered
          </button>
        </form>

      </div>
      <div className="p-2.5 mt-1 flex items-center rounded-md px-5 duration-300 cursor-pointer hover:px-8">
        <form onSubmit={handleSubmit}>
          <button className="text-[14px] ml-4 text-black font-bold" onClick={(e) => { setInput("Achievements of rit"); }} type="submit">
            Achievements
          </button>
        </form>
      </div>
      <div className="bg-gray-200 h-[1.3px] w-[300px] my-5"></div>
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





