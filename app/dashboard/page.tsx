// import Image from "next/image";
import Sidebar from "@/components/sidebar";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from 'lucide-react';
import { Card } from "../../components/ui/card";
import Link from "next/link";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";

const Home: React.FC = () => {


    return (
        <div className="flex lg:bg-white h-screen sm: bg-gray-200">
            <div className="flex flex-col flex-grow ">

                <div className="flex justify-center items-center xl:py-8">
                    <div className="space-y-4 mt-4 font-bold">

                        <div className="p-8 rounded-lg flex items-center justify-center bg-sky-100 w-[150px]">
                            <Loader />
                        </div>

                        {/* { message.length === 0 && !isLoading && (
                        <Empty label = "No messages yet" />
                        )} */}
                        <div className="overflow-y-auto max-h-96 space-y-3 p-2" >

                            <div

                                className={cn("p-8 w-full flex items-center gap-x-8 rounded-lg",
                                    // message.role === "assistant" ? "bg-slate-200 shadow-lg":"bg-[#edf4fc]"
                                )}
                            >
                                {/* {message.role === "assistant" ? <BotAvatar/> : <UserAvatar/>} */}
                                <p className="text-sm">
                                    message
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-grow">

                </div>
                <div className="flex justify-center item">
                    <div className="flex w-full max-w-4xl mb-24 px-7">
                        <input
                            type="text"
                            id="first_name"
                            className="bg-white border border-gray-300  px-10 h-12 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            placeholder="TYPE YOUR MESSAGE"
                            required
                        />

                        <Button className="ml-2 mt-1  bg-blue-600 rounded-xl "><SendHorizontal className="w-5 h-6" /></Button>

                    </div>
                </div>
            </div>
        </div>


    );
}

export default Home;