"use server";

import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getEmbeddings } from "../embeddings/route";
import { Pinecone } from "@pinecone-database/pinecone";
import { S3Client } from "@aws-sdk/client-s3";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { getid } from "../getid/route";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string });
const index = pc.index("chat-pdf");
const namespace = index.namespace("ns1");

const client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY as string,
    },
});
function split(str: string, chunkSize: number) {
    const chunks = [];
    let currentChunk = "";
    let currentLength = 0;
    const sentences = str.split(".");

    for (const sentence of sentences) {
        const trimmedSentence = sentence.trim();
        if (currentLength + trimmedSentence.length + 1 <= chunkSize) {
            currentChunk += trimmedSentence + ".";
            currentLength += trimmedSentence.length + 1;
        } else {
            chunks.push(currentChunk);
            currentChunk = trimmedSentence + ".";
            currentLength = trimmedSentence.length + 1;
        }
        if (currentLength >= chunkSize) {
            chunks.push(currentChunk);
            currentChunk = "";
            currentLength = 0;
        }
    }
    if (currentChunk.trim() !== "") {
        chunks.push(currentChunk);
    }
    return chunks;
}

export async function getstring(formdata: FormData) {
    const file = formdata.get("file") as File;
    const blob = new Blob([file], { type: "text/plain" });
    const buffer = Buffer.from(await blob.arrayBuffer());

    const commands = new PutObjectCommand({
        Bucket: "chat-pdf-rk",
        Key: `uploads/${file.name}`,
        Body: buffer,
    });
    try {
        const response = await client.send(commands);
        console.log(response);
    } catch (err) {
        console.error(err);
    }

    const command = new GetObjectCommand({
        Bucket: "chat-pdf-rk",
        Key: `uploads/${file.name}`,
    });

    try {
        const response = await client.send(command);
        if (!response) {
            console.log("No response");
        }
        const str = (await response.Body?.transformToString()) as string;
        console.log(str);
        const chunks = split(str, 1000);
        for (const chunk of chunks) {
            const embedding = await getEmbeddings(chunk);
            console.log(embedding);
            try {
                const id=await getid();
                await namespace.upsert([
                    { id: id, values: embedding, metadata: { data: chunk } },
                ]);
                await setDoc(doc(db, "allowlist", "e0HAWON71Tr6gqfp3EHy"), {
                    id: id + 1,
                  }, { merge: true });
                console.log("done");
            } catch (error) {
                console.log("error occured" + error);
            }
            console.log("chunk:" + chunk);
        }
    } catch (err) {
        console.error(err);
    }
    return {
        message: "success",
    };
}
