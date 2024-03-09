"use server"
import OpenAI from "openai";
import { match } from "../querycontent/route";
import { revalidatePath } from "next/cache";


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function getresponse(message:any) {
    try {
        // const content = await match(question);
        // const invalidresponse = "invalid"
        // const prompt = content === invalidresponse ? "convey the message to the user that I cannot respond with that question and tell that i have been trained to Rajalakshmi Institute of technology college data" : question;

        const response = await openai.chat.completions.create({
            messages: [{ "role": "system", "content": "regular chatbot" },
           { ...message}],
            model: "gpt-3.5-turbo",
        });
        console.log(response.choices[0].message);
        revalidatePath("/dashboard");
        return response.choices[0].message;
    }
    catch (error) {
        console.log("error calling openai embeddings api", error);
        throw error;
    }

}