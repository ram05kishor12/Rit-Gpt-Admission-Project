import OpenAI from 'openai';
import { match } from '../../actions/querycontent/route';
import { NextResponse } from 'next/server';
import next from 'next';
import {OpenAIStream,StreamingTextResponse} from 'ai';
import { Message } from 'ai'; // Import the Message type from the 'ai' module

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export  async function POST(req:Request, res:Response) {
    
        try {
            const {messages}=await req.json();
            console.log(messages);
            if (!messages) {
                return new NextResponse('No question provided', { status: 400 });
            }

            // const content = await match(question);
            // const invalidresponse = "invalid";
            // const prompt = content === invalidresponse ? "convey the message to the user that I cannot respond with that question and tell that i have been trained to Rajalakshmi Institute of technology college data" : question;

            const response = await openai.chat.completions.create({
                messages: [
                    { "role": "system", "content": "reuglar chatbot" },
                    ...messages, 
                ],
                model: "gpt-3.5-turbo",
            });

            const responseBody = JSON.stringify(response.choices[0].message);
            console.log(responseBody);

            return new NextResponse(responseBody);
            // res.status(200).json({ response: response.choices[0].message });
        } catch (error) {
            console.error("Error calling OpenAI embeddings API", error);
            return new NextResponse('Internal server errro', { status: 500 });
        }
    } 

