import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { File } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import { getstring } from "../actions/uploadfile/route";
import { app } from "../firebase/firebase";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Admin() {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log("user is signed in");
      // ...
    } else {
      // User is signed out
      // ..
    }
  });
  return (
    <>
      <div className="h-5">
        <Navbar />
      </div>
      <div className="flex justify-center  items-center h-60">
        <p className="text-2xl font-extrabold">Upload your file</p>
      </div>

      <div className="flex  items-center justify-center">
        <Card className="bg-gray-50  p-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center bg-primary/10 w-20 h-20 rounded-full">
              <File className="w-10 h-10 text-primary" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center mb-2">
            Upload college Data
          </h2>
          <div className=" flex justify-end text-sm leading-6 text-center text-muted-foreground mb-8 max-w-sm">
            Choose the text file of the college data to upload
          </div>
          <form action={getstring}>
            <div className="flex justify-center">
              <Input id="picture" type="file" name="file" />
              <Button className="text-md" type="submit">
                upload file
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
