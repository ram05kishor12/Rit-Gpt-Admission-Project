"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { browserLocalPersistence, setPersistence, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import { app, db } from "./firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const auth = getAuth(app);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();


  async function login() {
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
     
      router.push("/admin");
      setLoading(false);

    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setLoading(false);
     
      toast({ description: errorMessage, variant: "destructive" })
    }
  }
  return (
    <>
      <Navbar cont={true} admin={false} />
      <div className=" min-h-screen bg-gradient-to-r from-gray-100 via-blue-100 to-blue-300">

        <div className="flex w-full justify-center items-center h-screen px-20">
          <Card className="p-3 w-[400px] ">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>login using your email Id</CardDescription>
            </CardHeader>
            <form onSubmit={(e) => { e.preventDefault(); login() }}>
              <CardContent>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
              </CardContent>
              <CardContent>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Password</Label>
                  <Input type="password" id="e" placeholder="Email" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
              </CardContent>
              <CardContent>
                <div className="flex justify-center">
                  <Button className="text-md w-full" type="submit">
                    {loading ? (<div className="flex">
                      <div className="h-5 w-5 animate-spin rounded-full border-b-2"></div>
                      <div className="text-white">Logging in...</div>
                    </div>) : "Login"}
                  </Button>
                </div>
              </CardContent>
            </form>
            <CardFooter>

            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}