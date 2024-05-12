import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { Match } from "../../actions/route3";
import { NextResponse } from "next/server";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { messages } = await req.json();
    let message=""
    const question = messages[messages.length - 1].content+" "+"in this college";
    console.log("question" + question);
    try {
        let content = await Match(question);
        console.log("content" + content);
        if (content.includes("invalid")) {
             message=" respond that I am sorry, I cannot respond to this question as i have been trained to respond only to Rajalakshmi Insititue of Technology admission enquiries. Please ask a valid question."
        }
        else{
             message=content;
        }
          
            const response = await openai.chat.completions.create({
                messages: [{ role: "system", content: "you are an chatbot desgined to answer to questions regarding Rajalakshmi Institute of Technology" }, { role: "user", content: "i will provide you a content.you should respond only from it. if the content doesnt contains any information about the question,pls dont answer even as a general answer..content:"+message+"question is:"+question }],
                model: "gpt-3.5-turbo",
                stream: true,
                temperature:0.9,
            });
            console.log(response);
            const stream = OpenAIStream(response);
            
            // Respond with the stream
            return new StreamingTextResponse(stream);
        
    } catch (error) {
        console.log("error calling openai embeddings api", error);
    }
}
