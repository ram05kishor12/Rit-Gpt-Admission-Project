// import Image from "next/image";
"use client";
import Sidebar from "@/components/sidebar";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { Card } from "../../components/ui/card";
import Link from "next/link";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { getresponse } from "../actions/response/route";
import { useState } from "react";
import Image from "next/image";
import rit from "../../components/rit.png";
import { useChat } from "ai/react";

const Home: React.FC = () => {
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({ api: "../api/getresponse" });
    

    return (
        <div className="flex  h-screen  ">
            <div className="flex flex-col flex-grow justify-center   ">
                <div className="flex justify-start items-center  mx-5 md:mx-8 lg:mx-8 xl:mx-24 xl:px-20">
                    <div className="space-y-4 mt-4 font-bold">
                        <div
                            className="overflow-y-auto h-[600px] mt-8"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            <div
                                className={cn(
                                    "p-8 w-full flex flex-col items-center rounded-lg"
                                )}
                            >
                                {messages.map((message, index) => (
                                    <div className="flex flex-col w-full" key={index}>
                                        <div className=" flex flex-col mb-8 ">
                                            <div className="flex flex-col">
                                                <div className="flex">
                                                    {message.role === "user" ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-7 h-7 "
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <div className="flex ">
                                                            <Image
                                                                src={rit}
                                                                alt="RIT"
                                                                width={30}
                                                                height={20}
                                                            />
                                                            <p className="text-md ml-2">RITGPT</p>
                                                        </div>
                                                    )}
                                                    <p className="text-md ml-2 mb-1">
                                                        {message.role === "user" && "You"}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-sm ml-10">
                                                        {message.content}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-grow"></div>
                <div className="flex justify-center ">
                    <div className="flex w-full max-w-4xl  px-7">
                        <form
                            className="flex w-full max-w-4xl mb-24 px-7"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                id="first_name"
                                className="bg-white border border-gray-300  px-10 h-12 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                                placeholder="Ask a Question"
                                value={input}
                                onChange={handleInputChange}
                                required
                            />
                            <Button
                                type="submit"
                                className="ml-2 mt-1  bg-blue-600 rounded-xl "
                            >
                                <SendHorizontal className="w-5 h-6" />
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
