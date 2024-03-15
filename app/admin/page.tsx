"use client"
import { Input } from "@/components/ui/input";

import { File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import { getstring } from "../actions/uploadfile/route";

import { app } from "../firebase/firebase";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Admin() {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(true);
  const Router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("user is signed in +3");
      } else {
        // User is signed out
        console.log("user is not signed in +3");
        Router.push("/")
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  function signout() {
    signOut(auth).then(() => {
      console.log("user is signed out")
      Router.push("/")
    }).catch((error) => {
      console.log("user is not signed out")
    });
  }

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
          <div className="flex justify-center">
            <Button className="text-md" onClick={signout}>
              Signout
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
