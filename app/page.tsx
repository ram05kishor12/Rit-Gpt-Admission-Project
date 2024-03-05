// import Image from "next/image";
import Sidebar from "@/components/sidebar";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from 'lucide-react';
import { Card } from "../components/ui/card";
import Link from "next/link";
import Navbar from "@/components/navbar";



const Home: React.FC = () => {


  return (<>
  
    <div className="flex lg:bg-gray-300 h-screen sm: bg-gray-200">
      <div className="flex flex-col flex-grow ">
        <div className="flex justify-center mt-8">
          <Card className="hidden lg:block lg:w-5/6 h-[500px] bg-gray-200 shadow-lg ">
          </Card>
        </div>
        <div className="flex-grow"></div>
        <div className="flex justify-center">
          <div className="flex w-full max-w-4xl mb-24 px-7">
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300  px-10 h-12 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="TYPE YOUR MESSAGE"
              required
            />

            <Button className="ml-2 mt-1  bg-blue-600 rounded-xl "><SendHorizontal className="w-5 h-6" /></Button>

          </div>

        </div>
      </div>
    </div>

  </>
  );
}

export default Home;

// export default function Home() {
//   return(
//      <h1>Home</h1>
//   )
// }