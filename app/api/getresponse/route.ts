import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { match } from '../../actions/querycontent/route'
import { NextResponse } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export  async function POST(req: Request) {
    
    const { messages } = await req.json();
    const question = messages[messages.length - 1].content;
    console.log("question"+question);
        try {
            const content = await match(question);
            console.log("content"+content);
            const cont=content === "invalid" ? "convey the message to the user that I cannot respond with that question and tell that i have been trained to Rajalakshmi Institute of technology college data" : content;
            const invalidresponse = "invalid"
            const response = await openai.chat.completions.create({
                messages: [{ "role": "system", "content": cont},
                ...messages,
                ],
                model: "gpt-3.5-turbo",
                stream: true,
            });
            
            const stream = OpenAIStream(response)

            // Respond with the stream
            return new StreamingTextResponse(stream)
        }
        catch (error) {
            console.log("error calling openai embeddings api", error);
            return NextResponse.json({ error: 'Error calling OpenAI API' });
        }
   
}
