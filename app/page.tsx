// import Image from "next/image";
import Sidebar from "@/components/sidebar";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from 'lucide-react';
import { Card } from "../components/ui/card";


const Home: React.FC = () => {


  return (
    <div className="flex bg-gray-200 h-screen">
      <div className="flex flex-col flex-grow ">

        <div className="flex justify-center mt-8">
          <Card className="lg:w-[800px] h-[500px] bg-gray-100 bg-transparent shadow-lg sm:w-[400px]">
          </Card>
        </div>
        <div className="flex-grow"></div>
        <div className="flex justify-center">
          <div className="flex w-full max-w-3xl mb-24 px-4">
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="TYPE YOUR MESSAGE"
              required
            />
            <Button className="ml-2  bg-blue-600 rounded-xl "><SendHorizontal className="w-5 h-6" /></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
