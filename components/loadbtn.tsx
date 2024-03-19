"use client"
import { useFormStatus } from "react-dom"
import { Button } from "./ui/button";

function Loadingbtn({ content }: { content: string }) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="text-white   focus:ring-4 focus:outline-none  text-xl rounded-lg  px-20 py-2.5 text-center me-2 mb-2 disabled:bg-opacity-20">
            {pending ? (<>
                <div className="flex">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2"></div>
                    <div className="text-white">Submitting...</div>
                </div>
            </>
            ) : (<>{content}</>)}</Button>
    )
}

export default Loadingbtn