"use client";

import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import rit from "../../components/rit.png";
import { CircleSlash2 } from "lucide-react";
import { useRef, useEffect, Key } from "react";
import ChatContext from "@/components/chatprovider";
import { useContext } from "react";
import { useToast } from "../../components/ui/use-toast"

const Home: React.FC = () => {
    const { messages, input, handleInputChange, handleSubmit, isLoading, stop,error } = useContext(ChatContext);
    const { toast } = useToast();
   
useEffect(() => {
    if (error) {
       toast({ title:"Error",description:error.toString(),variant:"destructive" })
    }
}
, [error]);
    const chatContainerRef = useRef<HTMLDivElement>(null);
     

    useEffect(() => {
        // Scroll to the bottom of the chat container whenever messages change
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const formatResponse = (response: string): JSX.Element => {
        // Split the response into paragraphs based on double line breaks
        const paragraphs: string[] = response.split("\n\n");

        const renderFormattedText = (text: string, index: number) => {
            if (text.includes("**")) {
                // Handle bold text
                const parts = text.split("**");
                return (
                    <p key={index}>
                        {parts.map((part, i) => {
                            if (i % 2 === 1) {
                                return <strong key={i}>{part}</strong>;
                            }
                            return part;
                        })}
                    </p>
                );
            } else if (text.match(/^\d+\.\s/)) {
                // Handle ordered lists
                const lines = text.split("\n");
                return (
                    <ol key={index}>
                        {lines.map((line, lineIndex) => (
                            <li key={lineIndex}>{line.replace(/^\d+\.\s/, '')}</li>
                        ))}
                    </ol>
                );
            } else if (text.startsWith("- ")) {
                // Handle unordered lists
                const lines = text.split("\n");
                return (
                    <ul key={index}>
                        {lines.map((line, lineIndex) => (
                            <li key={lineIndex}>{line.replace(/^- /, '')}</li>
                        ))}
                    </ul>
                );
            } else if (text.startsWith("<") && text.endsWith(">")) {
                // Handle JSX
                return (
                    <div key={index} dangerouslySetInnerHTML={{ __html: text }} />
                );
            } else if (text.startsWith("|") && text.endsWith("|")) {
                // Handle tables
                const rows = text.split("\n");
                const headers = rows[0].split("|").filter(Boolean);
                const data = rows.slice(1).map(row => row.split("|").filter(Boolean));
    
                return (
                    <table key={index}>
                        <thead>
                            <tr>
                                {headers.map((header, headerIndex) => (
                                    <th key={headerIndex}>{header.trim()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell.trim()}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );
            } else {
                // Handle regular paragraphs
                return <p key={index}>{text}</p>;
            }
        };
    
        return (
            <div>
                {paragraphs.map((paragraph, index) => renderFormattedText(paragraph, index))}
            </div>
        );
    };

    
    return (
        <div className="h-[100vh] flex flex-col">
             {messages.length == 0 &&(<div className="flex  flex-col justify-center items-center w-full h-full pb-52 text-black fade-in">
                <div>
                    <Image src={rit} alt="RIT" width={80} height={80} />
                </div>
                <div className="text-xl font-bold mt-6">Hello,How can i assist you today?</div>
             </div>) }
            <div className="flex-1 flex justify-center items-start  bg-white overflow-y-auto" ref={chatContainerRef}>
                <div className="flex justify-start  flex-grow items-start overflow-y-auto mx-3 md:mx-8 lg:mx-8 xl:mx-24 xl:px-20">
                    <div className="space-y-4 mt-4 font-bold overflow-y-auto ">
                   
                        <div
                            className="overflow-y-scroll h-[calc(100%-4rem)] mt-2 mb-[8rem]"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            <div
                                className={cn(
                                    "p-6 w-full flex flex-col items-center rounded-lg"
                                )}
                            >
                                {messages.map((message: { role: string; content: string; }, index: Key | null | undefined) => (
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
                                                        {formatResponse(message.content)}
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
            </div>

            <div className=" sticky bottom-0 px-6 flex flex-col items-center justify-center bg-white ">
                <form
                    className="flex items-center w-full max-w-4xl mb-6 "
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
                    <Button type="submit" className="ml-2 h-11 bg-blue-600 rounded-xl">
                        {isLoading ? (
                            <CircleSlash2 onClick={stop} className="w-5 h-6" />
                        ) : (
                            <SendHorizontal className="w-5 h-6" />
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Home;
