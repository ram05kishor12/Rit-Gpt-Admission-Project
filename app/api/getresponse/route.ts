import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { match } from '../../actions/querycontent/route'
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export  async function POST(req: Request) {
    
        const question = await req.json();
        const message=question.message;
        try {
            // const content = await match(question);
            // const invalidresponse = "invalid"
            // const prompt = content === invalidresponse ? "convey the message to the user that I cannot respond with that question and tell that i have been trained to Rajalakshmi Institute of technology college data" : question;

            const response = await openai.chat.completions.create({
                messages: [{ "role": "system", "content": "regular chatbot" },
                ...message
                ],
                model: "gpt-3.5-turbo",
            });
            return NextResponse.json({ message: response.choices[0].message });
        }
        catch (error) {
            console.log("error calling openai embeddings api", error);
            return NextResponse.json({ error: 'Error calling OpenAI API' });
        }
   
}
