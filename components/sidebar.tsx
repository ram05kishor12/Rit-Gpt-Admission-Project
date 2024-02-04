import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import Logo from '../public/logo.jpg'
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Globe } from 'lucide-react';

const montserrat = Poppins({
    weight: '600',
    subsets: ['latin'],
});

function sidebar() {
    return (
            <div className="sidebar h-screen w-[300px] overflow-y-auto text-center bg-slate-950">
                <Image className='mx-5 mt-5 rounded-md' src={Logo} alt="logo" width={250} height={300} />
                <div className="bg-gray-600 h-[0.5px] w-[300px] my-5">
                </div>
                <div className="text-white text-2xl font-bold py-2">
                    <Button className='w-60  shadow-gray-900  animate-fade-in hover:transform hover:scale-105 transition-transform text-white hover:bg-blue-950 shadow-lg bg-blue-700'>
                        <div className=' flex gap-1 text-xl'>
                            <Plus />
                            New Chat
                        </div>
                    </Button>
                </div>
                <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300">
                    <span className="text-[13px] ml-4 text-zinc-400 font-bold">Suggestions</span>
                </div>
                <div className="p-2.5 mt-1 flex items-center rounded-md px-5 duration-300 cursor-pointer hover:px-8 ">
                    <i className="bi bi-house-door-fill"></i>
                    <span className="text-[15px] ml-4 text-gray-200 font-bold">Why RIT ?</span>
                </div>
                <div className="p-2.5 mt-1 flex items-center rounded-md px-5 duration-300 cursor-pointer hover:px-8">
                    <i className="bi bi-house-door-fill"></i>
                    <span className="text-[15px] ml-4 text-gray-200 font-bold">Courses Offered</span>
                </div>
                <div className="p-2.5 mt-1 flex items-center rounded-md px-5 duration-300 cursor-pointer hover:px-8">
                    <span className="text-[15px] ml-4 text-gray-200 font-bold">Our Achievements</span>
                </div>
                <div className="bg-gray-600 h-[0.5px] w-[300px] my-5">
                </div>
                <div className='text-white text-xl font-bold'>
                    <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300">
                        <span className="text-[13px] ml-4 text-zinc-400 font-bold">Contact Details</span>
                    </div>
                    <div className="p-2.5 flex items-center rounded-md mx-3 duration-300 cursor-pointer">
                        <span className="flex gap-2 text-[14px] ml-4 text-gray-200 font-medium"> <Phone /> 90509479540 </span>
                    </div>
                    <div className="p-2.5 flex items-center rounded-md mx-3 duration-300 cursor-pointer">
                        <span className="flex gap-2 text-[14px] ml-4 text-gray-200 font-medium"><Mail /> contanct@ritchennai.edu.in </span>
                    </div>
                    <div className="p-2.5 flex items-center rounded-md mx-3 duration-300 cursor-pointer">
                        <i className="bi bi-house-door-fill"></i>
                        <a className="flex gap-2 text-[14px] ml-4 text-gray-200 font-medium"><Globe/> ritchennai.org </a>
                    </div>
            
                </div>
            </div>

    )
}

export default sidebar
