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
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast"
import { db } from "../firebase/firebase";
import logo from "../../components/rit.png";
import Loadingbtn from "@/components/loadbtn";



export default function Admin() {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(true);
  const [action, setaction] = useState("addfile");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnloading, setbtnloading] = useState(false);
  const Router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("user is not signed in +3");
      } else {

        console.log("usseffect" + auth.currentUser?.uid);
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

      setbtnloading(true);
      if (auth.currentUser != null) {
        console.log("current uid" + auth.currentUser.uid);
        console.log(auth.currentUser.email);
        const data = await getDoc(doc(db, "allowlist", "CECgg7h8hKr4f2nqdvUd"));
        console.log(data.data());
        const persons = data.data()?.person;
        console.log(persons);
        await setDoc(doc(db, "allowlist", "CECgg7h8hKr4f2nqdvUd"), {
          person: [...persons, email],
        }, { merge: true });

        await createUserWithEmailAndPassword(auth, email, password);

        toast({ description: "Admin added", variant: "success" });
        setbtnloading(false);
      }
    } catch (error: any) {
      console.error("Error adding document: ", error);
      toast({ description: error.message, variant: "destructive" });
    }
  }


  return (
    <>
      <div className="h-5">
        <Navbar cont={false} />
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
                  <Loadingbtn content={"upload file"} />
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
                    <Button className="text-md w-full" type="submit" onClick={addadmin}>
                      {btnloading && (
                        <div role="status">
                          <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin mr-2 dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                          </svg>

                        </div>
                      )}
                      {btnloading ? "Adding" : "Add Admin"}
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
