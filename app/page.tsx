
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
import { auth } from "./firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import Link from "next/link";
import Navbar from "@/components/navbar";

export default function Home() {
  // signInWithEmailAndPassword(auth, "", "")
  //   .then((userCredential) => {
  //     // Signed in 
  //     const user = userCredential.user;
  //     console.log("user is signed in")
  //     console.log(user);
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log("user is not signed in")
  //     console.log(errorCode)
  //     console.log(errorMessage)
  //   });

  return (
    <>
      <Navbar />
      <div className=" min-h-screen bg-gradient-to-r from-gray-100 via-blue-100 to-blue-300">

        <div className="flex w-full justify-center items-center h-screen">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>login using your email Id</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" />
              </div>
            </CardContent>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Password</Label>
                <Input type="password" id="email" placeholder="Email" />
              </div>
            </CardContent>
            <CardContent>
              <div className="flex justify-center">
                <Button className="text-md w-full" type="submit">
                  Login
                </Button>
              </div>
            </CardContent>
            <CardFooter>

            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
