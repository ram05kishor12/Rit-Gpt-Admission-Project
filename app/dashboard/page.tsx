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

const Home: React.FC = () => {
    const [message, setMessage] = useState({});

    async function response() {
        const response = await getresponse(message);
    }

    return (
        <div className="flex  h-screen  ">
            <div className="flex flex-col flex-grow justify-center   ">
                <div className="flex justify-start items-center  mx-5 md:mx-8 lg:mx-8 xl:mx-24 xl:px-20">
                    <div className="space-y-4 mt-4 font-bold">
                        {/* <div className="p-8 rounded-lg flex items-center justify-center bg-sky-100 w-[150px]">
                            <Loader />
                        </div> */}

                        {/* { message.length === 0 && !isLoading && (
                        <Empty label = "No messages yet" />
                        )} */}
                        <div
                            className="overflow-y-auto h-[600px] mt-8"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            <div
                                className={cn(
                                    "p-8 w-full flex items-center rounded-lg"
                                    // message.role === "assistant" ? "bg-slate-200 shadow-lg":"bg-[#edf4fc]"
                                )}
                            >
                                {/* {message.role === "assistant" ? <BotAvatar/> : <UserAvatar/>} */}

                                <div className="flex-col w-full h-screen ">
                                    <div className="mb-8 ">
                                        <div className="flex ">
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
                                            <p className="text-md ml-2 mb-1">You</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="text-sm ml-10">
                                                Hello, I am a bot. How can I help you?
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex ">
                                        <Image src={rit} alt="RIT" width={30} height={20} />
                                        <p className="text-md ml-2">RITGPT</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-sm ml-10">
                                            Hello, I am a bot. How can I help you? Lorem ipsum dolor
                                            sit amet, consectetur adipisicing elit. Commodi odio quasi
                                            esse, ipsam nam labore. Animi ea ipsa beatae magnam eaque
                                            temporibus natus modi corporis repellendus voluptatum amet
                                            nulla veritatis, asperiores dicta quasi, mollitia
                                            dignissimos, sint pariatur totam rerum. Suscipit ab
                                            aliquam facere tempore blanditiis libero qui nam alias
                                            molestias fugit animi, natus sit adipisci hic illo nemo.
                                            Cupiditate adipisci soluta odit. Sed ex quis recusandae,
                                            molestiae nobis voluptatem rerum in, explicabo tenetur
                                            enim dolores illum sapiente officiis. Quo nam tempora
                                            perferendis culpa dolorum nulla sequi nihil est doloribus
                                            sapiente! Deleniti iste accusantium fuga impedit nostrum
                                            officia ab earum pariatur non necessitatibus assumenda
                                            praesentium aliquam quod unde voluptate ullam, voluptatum,
                                            aspernatur dolorum. Voluptatem, et! Iure hic similique
                                            earum rem iusto voluptatem dolorum accusantium, deleniti
                                            doloribus velit numquam harum aliquam dolorem mollitia
                                            beatae amet, laboriosam unde a repellat. Ab laboriosam
                                            tenetur quae magnam dolore consectetur explicabo iste.
                                            Provident voluptatibus libero neque, suscipit dicta facere
                                            dolores illo placeat porro modi iusto quas. Sequi quod
                                            maiores accusantium blanditiis ab sint magnam sapiente
                                            ducimus nisi dolores exercitationem qui nostrum placeat
                                            eaque, repellendus provident neque sed eos atque. Voluptas
                                            nihil itaque totam aperiam vero, aspernatur, vel
                                            voluptatibus cum consectetur error eius debitis! Totam
                                            animi incidunt, modi optio cum minus aut veniam temporibus
                                            pariatur. Natus ipsa in facilis possimus libero animi
                                            voluptate nobis, provident autem unde iste asperiores
                                            reprehenderit consequuntur porro eligendi sapiente
                                            perferendis voluptas eos odio? Eaque nesciunt quaerat iste
                                            consequatur eos qui corporis fugit?
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-grow"></div>
                <div className="flex justify-center ">
                    <div className="flex w-full max-w-4xl mb-24 px-7">
                        <input
                            type="text"
                            id="first_name"
                            className="bg-white border border-gray-300  px-10 h-12 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            placeholder="TYPE YOUR MESSAGE"
                            required
                        />
                        <Button
                            onClick={() => response()}
                            className="ml-2 mt-1  bg-blue-600 rounded-xl "
                        >
                            <SendHorizontal className="w-5 h-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
