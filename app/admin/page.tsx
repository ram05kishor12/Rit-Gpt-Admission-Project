import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { File } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import { getstring } from "../actions/uploadfile/route";

export default function Admin() {
  return (
    <>
      <div className="h-5">
        <Navbar />
      </div>
      <div className="flex justify-center  items-center h-60">
       <p className="text-2xl font-extrabold">Upload your file</p>
      </div>

      <div className="flex  items-center justify-center">
        <Card className="bg-gray-50 p-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center bg-primary/10 w-20 h-20 rounded-full">
              <File className="w-10 h-10 text-primary" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center mb-2">
            You don't have any notes created
          </h2>
          <p className="text-sm leading-6 text-center text-muted-foreground mb-8 max-w-sm">
            You currently don't have any notes. Please create some so that you can see them right here.
          </p>
          <form action={getstring}>

          <div className="flex justify-center">
          <Input id="picture" type="file" name="file" />
          <Button className="text-md" type="submit">upload file</Button>
          </div>
          </form>
        </Card>
      </div>
    </>
  );
}
