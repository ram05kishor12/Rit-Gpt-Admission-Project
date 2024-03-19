"use server";

import { Pinecone } from "@pinecone-database/pinecone";
import { getEmbeddings } from "../embeddings/route";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string });
const index = pc.index("chat-pdf");
const namespace = index.namespace("ns1");

export async function match(question: string) {
    try {
        const vectors = await getEmbeddings(question);
        const queryResponse = await namespace.query({
            vector: vectors,
            topK: 6,
            includeMetadata: true,
        });
        console.log(queryResponse);
        type Metadata = {
            data: string;
        };
        const qualify = queryResponse.matches.filter(
            (match) => match.score && match.score > 0.75
        );

        const content = qualify.map((match) => match.metadata as Metadata);

        const dataString = content.reduce((acc, item) => {
            if (item && item.data) {
                return acc + item.data;
            } else {
                return acc;
            }
        }, "");

        if (!dataString) {
            console.log("empty succeded");
            return "invalid";
        } else {
            return dataString;
        }
    } catch (error) {
        const data = "invalid";
        return data;
    }
}
