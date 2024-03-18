"use client"
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/navbar";
import { useState, useEffect } from "react";
import { getstring } from "../actions/uploadfile/route";

import { app } from "../firebase/firebase";
import { onAuthStateChanged, getAuth, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { UserPlus } from 'lucide-react';
import { Upload } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { collection, addDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast"
import { db } from "../firebase/firebase";
import logo from "../../components/rit.png";

export default function Admin() {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(true);
  const [action, setaction] = useState("addfile");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("user is not signed in +3");
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen space-x-4">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-400"></div>
        <div className="text-primary">Loading...</div>
      </div>
    );
  }
  if (!auth.currentUser) {
    return <div className="flex flex-row justify-center items-center h-screen gap-4">
      <Image className="w-14 h-14" src={logo} alt="Example" />
      <p className="text-4xl font-bold text-primary">404 Not Found </p>
    </div>
  }

  async function signout() {
    await signOut(auth).then(() => {
      console.log("user is signed out")
      Router.push("/")
    }).catch((error) => {
      console.log("user is not signed out")
    });
  }
  async function addadmin() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "allowlist"), {
        person: email,
      });
      toast({ description: "Admin added", variant: "success" });
    } catch (error: any) {
      console.error("Error adding document: ", error);
      toast({ description: error.message, variant: "destructive" });
    }
  }


  return (
    <>
      <div className="h-5">
        <Navbar />
      </div>
      <div className="flex flex-col  md:flex-row ">

        <div className=" flex  overflow-hidden   bg-zinc-100 border-r-2 h-screen p-3  lg:w-56 mt-10 md:w-1/3 ">
          <div className="  flex flex-col px-3 h-screen">
            <h1 className="text-2xl font-semibold mt-8 ml-4">Dashboard</h1>
            <div className="h-3/4 flex flex-col justify-between">
              <div>
                <div className="flex items-start mt-16 cursor-pointer" onClick={() => setaction("addadmin")}>
                  <UserPlus />
                  <p className="text-sm font-semibold ml-3 ">Add Administrators</p>
                </div>
                <div className="flex mt-6 cursor-pointer" onClick={() => setaction("addfile")}>
                  <Upload />
                  <p className="text-sm font-semibold ml-3 ">Upload file</p>
                </div>
              </div>
              <div className="flex items-end mt-8">
                <Button className="text-md rounded-xl   w-full  border-2" onClick={() => signout()}>
                  Signout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-center items-center p-24">
            <p className="text-2xl font-extrabold px-4   md:px-14 mt-8 md:mt-0">{action === "addfile" ? "Upload your file" : "Add Administrators"}</p>
          </div>

          <div className="flex items-center justify-center h-auto  p-8 ">
            <Card className="bg-gray-50 p-8 flex-shrink w-full md:w-auto">
              <div className="flex justify-center mb-6">
                <div className="flex items-center justify-center bg-primary/10 w-20 h-20 rounded-full">
                  {action === "addfile" ? (<File className="w-10 h-10 text-primary" />) : (<UserPlus className="w-10 h-10 text-primary" />)}
                </div>
              </div>

              <h2 className="text-xl font-semibold text-center mb-2">
                {action === "addfile" ? "Upload college" : "Add Administrators details"}
              </h2>
              {action === "addfile" ? (<>

                <div className="flex justify-center text-sm leading-6 text-center text-muted-foreground mb-8 max-w-md">
                  Choose the text file of the college data to upload
                </div>
                <form action={getstring} className="flex flex-col items-center">
                  <Input id="picture" type="file" name="file" className="mb-4" />
                  <Button className="text-md" type="submit">
                    Upload File
                  </Button>
                </form>
              </>
              ) : (<>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col justify-start w-full mt-8 mb-6 gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                  </div>
                  <div className="flex flex-col  gap-1.5">
                    <Label htmlFor="email">Password</Label>
                    <Input type="password" id="e" placeholder="Email" onChange={(e) => { setPassword(e.target.value) }} />
                  </div>
                  <div className="flex justify-center mt-8">
                    <Button className="text-md w-full" onClick={addadmin}>
                      Add Admin
                    </Button>
                  </div>
                </form>
              </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>

  );
}
