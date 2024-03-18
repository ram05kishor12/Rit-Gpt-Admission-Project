import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { match } from "../../actions/querycontent/route";
import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { messages } = await req.json();
    const question = messages[messages.length - 1].content;
    console.log("question" + question);
    try {
        let content = await match(question);
        console.log("content" + content);
        if (content.includes("invalid")) {
            let string = "I am sorry, I cannot respond to this question as i have been trained to respond only to Rajalakshmi Insititue of Technology admission enquiries. Please ask a valid question.";
            let readableStream = new ReadableStream({
                start(controller) {
                    controller.enqueue(new TextEncoder().encode(string));
                    controller.close();
                },
            });
            return new StreamingTextResponse(readableStream);
        }
        else{  
            const response = await openai.chat.completions.create({
                messages: [{ role: "system", content: content }, ...messages],
                model: "gpt-3.5-turbo",
                stream: true,
            });
            console.log(response);
            const stream = OpenAIStream(response);
            
            // Respond with the stream
            return new StreamingTextResponse(stream);
        }
    } catch (error) {
        console.log("error calling openai embeddings api", error);
        return NextResponse.json({ error: "Error calling OpenAI API" });
    }
}
