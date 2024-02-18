

"use server";

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getEmbeddings } from "../openai/route";
import { Pinecone } from "@pinecone-database/pinecone";
import { embeddings } from "../pinecone/constants";

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
function split(str: string, chunksize: number) {
    const chunks = [];
    let pointer = 0;
    while (pointer < str.length) {
        let endindex = pointer + chunksize;
        while (endindex > pointer && str[endindex - 1] !== ".") {
            endindex--;
        }
        chunks.push(str.substring(pointer, endindex).trim());
        pointer = endindex;
    }
    return chunks;
}

export async function getstring() {
    const command = new GetObjectCommand({
        Bucket: "chat-pdf-rk",
        Key: "uploads/demo3.txt",
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
                await namespace.upsert([
                    { id: "5", values: embedding, metadata: { data: chunk } },
                ]);
                console.log("done");
            } catch (error) {
                console.log("error occured" + error);
            }
        }
        return str;
    } catch (err) {
        console.error(err);
    }
}
