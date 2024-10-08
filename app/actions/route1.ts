"use server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function GetEmbeddings(text: string) {
    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-ada-002",
            input: text,
        });
        const result = await JSON.parse(JSON.stringify(response));
        return result.data[0].embedding as number[];
    } catch (error) {
       
        throw error;
    }
}
