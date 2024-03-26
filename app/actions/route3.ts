"use server";

import { Pinecone } from "@pinecone-database/pinecone";
import {GetEmbeddings}  from "../actions/route1";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY as string });
const index = pc.index("chat-pdf");
const namespace = index.namespace("ns1");

export async function Match(question: string) {
    try {
        const vectors = await GetEmbeddings(question);
        const queryResponse = await namespace.query({
            vector: vectors,
            topK: 5,
            includeMetadata: true,
        });
        console.log(queryResponse);
        type Metadata = {
            data: string;
        };
        const qualify = queryResponse.matches.filter(
            (match) => match.score && match.score > 0.73
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
