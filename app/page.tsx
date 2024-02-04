import Image from "next/image";
import Sidebar from "@/components/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  return (
    <div className="flex bg-gray-200 h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow ">
        <div className="bg-gray-300 p-2">
          <h1 className="text-4xl text-black font-bold px-5">RIT-BOT</h1>
        </div>
        <div className="flex-grow"></div>
        <div className="flex justify-center">
          <div className="flex w-full max-w-3xl mb-8 px-5">
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
              placeholder="TYPE YOUR MESSAGE"
              required
            />
            <Button className="ml-2">Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
