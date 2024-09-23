import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { ChatProvider } from "@/components/chatprovider";

const inter = Poppins({ weight: "400", subsets: ["devanagari"] });

export const metadata: Metadata = {
  title: "RIT GPT",
  description: "get your queries answered",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChatProvider>
          <main>
            <Toaster />
          </main>
          {children}
        </ChatProvider>
      </body>
    </html>
  );
}
