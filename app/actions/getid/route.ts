"use server"
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";


export async function Getid() {
        const data = await getDoc(doc(db, "allowlist", "e0HAWON71Tr6gqfp3EHy"));
        console.log(data.data()?.id);
        return data.data()?.id;
}
