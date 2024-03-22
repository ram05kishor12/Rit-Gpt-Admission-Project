import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";

const inter = Poppins({ weight: "400", subsets: ['devanagari'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className=" hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] ">
                    <Sidebar />
                </div>
                <div className="  md:pl-72">
                    <Navbar cont={false} admin={false} />
                    {children}
                </div>


            </body>
        </html>
    );
}
