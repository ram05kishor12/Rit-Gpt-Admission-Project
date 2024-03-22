"use client";

import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import rit from "../../components/rit.png";
import { useChat } from "ai/react";
import { CircleSlash2 } from "lucide-react";
import { useRef, useEffect } from "react";


const Home: React.FC = () => {
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
        useChat({ api: "../api/getresponse" });

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to the bottom of the chat container whenever messages change
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const formatResponse = (response: string): JSX.Element => {
        // Split the response into paragraphs based on double line breaks
        const paragraphs: string[] = response.split("\n\n");

        return (
            <div>
                {paragraphs.map((paragraph: string, index: number) => {
                    if (paragraph.includes("**")) {
                        // Check if the paragraph contains '**' to denote bold text
                        // Split the paragraph based on '**' to get parts before, between, and after bold text
                        const parts: string[] = paragraph.split("**");

                        // Map over the parts to render them accordingly
                        return (
                            <p key={index}>
                                {parts.map((part: string, i: number) => {
                                    // If part index is odd, render it as bold text
                                    if (i % 2 === 1) {
                                        return <strong key={i}>{part}</strong>;
                                    }
                                    return part;
                                })}
                            </p>
                        );
                    } else if (paragraph.match(/^\d+\.\s/)) {
                        // Check if the paragraph starts with a number followed by a dot and a space
                        const lines: string[] = paragraph.split("\n");
                        return (
                            <ol key={index}>
                                {lines.map((line, lineIndex) => (
                                    <li key={lineIndex}>{line}</li>
                                ))}
                            </ol>
                        );
                    } else {
                        // Render regular paragraph if no bold formatting is found and not numbered lines
                        return <p key={index}>{paragraph}</p>;
                    }
                })}
            </div>
        );
    };
    return (

        // <div className="flex flex-col  h-screen  ">
        //     <div className="flex justify-start h-3/4 flex-grow items-center mx-5 md:mx-8 lg:mx-8 xl:mx-24 xl:px-20">
        //         <div className="space-y-4 mt-4 font-bold">
        //             <div
        //                 ref={chatContainerRef}
        //                 className="overflow-y-auto h-[600px] mt-8"
        //                 style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        //             >
        //                 <div className={cn("p-8 w-full flex flex-col items-center rounded-lg")}>
        //                     {messages.map((message, index) => (
        //                         <div className="flex flex-col w-full" key={index}>
        //                             <div className="flex flex-col mb-8">
        //                                 <div className="flex flex-col">
        //                                     <div className="flex">
        //                                         {message.role === "user" ? (
        //                                             <svg
        //                                                 xmlns="http://www.w3.org/2000/svg"
        //                                                 fill="none"
        //                                                 viewBox="0 0 24 24"
        //                                                 strokeWidth={1.5}
        //                                                 stroke="currentColor"
        //                                                 className="w-7 h-7"
        //                                             >
        //                                                 <path
        //                                                     strokeLinecap="round"
        //                                                     strokeLinejoin="round"
        //                                                     d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        //                                                 />
        //                                             </svg>
        //                                         ) : (
        //                                             <div className="flex">
        //                                                 <Image src={rit} alt="RIT" width={30} height={20} />
        //                                                 <p className="text-md ml-2">RITGPT</p>
        //                                             </div>
        //                                         )}
        //                                         <p className="text-md ml-2 mb-1">
        //                                             {message.role === "user" && "You"}
        //                                         </p>
        //                                     </div>
        //                                     <div className="flex flex-col">
        //                                         <p className="text-sm ml-10">{formatResponse(message.content)}</p>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     ))}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        // //     <div className="flex justify-center items-start w-full pb-14 mt-8 z-50 ">
        // //         <div className="flex items-center  w-full ">
        // //             <div className="flex w-full  px-7 justify-center  ">
        // //                 <form
        //                     className="flex w-full max-w-4xl   "
        //                     onSubmit={handleSubmit}
        //                 >
        //                     <input
        //                         type="text"
        //                         id="first_name"
        //                         className="bg-white border  border-gray-300 px-10 h-12    md:mb-0 lg:mb-0 xl:mb-0 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                         placeholder="Ask a Question"
        //                         value={input}
        //                         onChange={handleInputChange}
        //                         required
        //                     />
        //                     <Button
        //                         type="submit"
        //                         className="ml-2 mt-1 bg-blue-600 rounded-xl"
        //                     >
        //                         {isLoading ? (
        //                             <CircleSlash2 onClick={stop} className="w-5 h-6" />
        //                         ) : (
        //                             <SendHorizontal className="w-5 h-6" />
        //                         )}
        //                     </Button>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="h-[100vh] flex flex-col">
            {/* Message Container */}
            <div className="flex-1 flex justify-center items-start  bg-white overflow-y-auto">
                <div className="flex justify-start  flex-grow items-start overflow-y-auto mx-3 md:mx-8 lg:mx-8 xl:mx-24 xl:px-20">
                    <div className="space-y-4 mt-4 font-bold overflow-y-auto">
                        <div
                            ref={chatContainerRef}
                            className="overflow-y-scroll h-[calc(100%-4rem)] mt-2 mb-[8rem]"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            <div className={cn("p-6 w-full flex flex-col items-center rounded-lg")}>
                                {messages.map((message, index) => (
                                    <div className="flex flex-col w-full" key={index}>
                                        <div className="flex flex-col mb-8">
                                            <div className="flex flex-col">
                                                <div className="flex">
                                                    {message.role === "user" ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-7 h-7"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <div className="flex">
                                                            <Image src={rit} alt="RIT" width={30} height={20} />
                                                            <p className="text-md ml-2">RITGPT</p>
                                                        </div>
                                                    )}
                                                    <p className="text-md ml-2 mb-1">
                                                        {message.role === "user" && "You"}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="text-sm ml-10">{formatResponse(message.content)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input Bar */}
            <div className=" sticky bottom-0 px-6 flex flex-col items-center justify-center bg-white ">
                <form
                    className="flex items-center w-full max-w-4xl   "
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        id="first_name"
                        className="bg-white border  border-gray-300 px-10 h-12   text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Ask a Question"
                        value={input}
                        onChange={handleInputChange}
                        required
                    />
                    <Button
                        type="submit"
                        className="ml-2 mt-1 bg-blue-600 rounded-xl"
                    >
                        {isLoading ? (
                            <CircleSlash2 onClick={stop} className="w-5 h-6" />
                        ) : (
                            <SendHorizontal className="w-5 h-6" />
                        )}
                    </Button>
                </form>
                <div className="text-xs md:text-sm lg:text-sm xl:text-sm bg-white my-3 h-2  text-center text-gray-400">RITGPT can make mistakes.Please use carefully</div>
            </div>
        </div>
    );
};

export default Home;
