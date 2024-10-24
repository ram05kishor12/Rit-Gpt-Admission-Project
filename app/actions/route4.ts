"use server";

import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { GetEmbeddings } from "../actions/route1";
import { Pinecone } from "@pinecone-database/pinecone";
import { S3Client } from "@aws-sdk/client-s3";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebase";
import { Getid } from "../actions/route2";

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
function split(str: string, chunkSize: number) {
    const chunks = [];
    let currentChunk = "";
    let currentLength = 0;
    const sentences = str.split(".");

    for (const sentence of sentences) {
        const trimmedSentence = sentence.trim();
        if (currentLength + trimmedSentence.length + 1 <= chunkSize) {
            currentChunk += trimmedSentence + ".";
            currentLength += trimmedSentence.length + 1;
        } else {
            chunks.push(currentChunk);
            currentChunk = trimmedSentence + ".";
            currentLength = trimmedSentence.length + 1;
        }
        if (currentLength >= chunkSize) {
            chunks.push(currentChunk);
            currentChunk = "";
            currentLength = 0;
        }
    }
    if (currentChunk.trim() !== "") {
        chunks.push(currentChunk);
    }
    return chunks;
}


// function splitTextIntoChunks(text, wordLimit) {
//     const lines = text.split('\n');
//     let chunks = [];
//     let currentChunk = '';
//     let heading = '';
//     let subheading = '';
//     let wordsInChunk = [];
  
//     lines.forEach(line => {
//       const words = line.split(/\s+/);
  
//       if (line.startsWith('##')) {
//         subheading = line.replace(/^##\s*/, '');
//       } else if (line.startsWith('#')) {
//         heading = line.replace(/^#\s*/, '');
//         subheading = '';
//       } else {
//         words.forEach(word => {
//           wordsInChunk.push(word);
//           if (wordsInChunk.length === wordLimit) {
//             let chunk = heading;
//             if (subheading) chunk += ` ${subheading}`;
//             chunk += ' ' + wordsInChunk.join(' ');
  
//             chunks.push(chunk.trim());
//             wordsInChunk = [];
//           }
//         });
//       }
//     });
  
//     if (wordsInChunk.length > 0) {
//       let chunk = heading;
//       if (subheading) chunk += ` ${subheading}`;
//       chunk += ' ' + wordsInChunk.join(' ');
//       chunks.push(chunk.trim());
//     }
  
//     return chunks;
//   }
  
//   const text = `
//   # About
//   Rajalakshmi Institute of Technology was established in 2008. RIT is accredited with highest grade of A++ by NAAC. RIT is affiliated with Anna University Chennai. It is one of the AICTE-approved colleges in Chennai New Delhi, and also offers NBA-approved courses.
//   ## Moreabout 
//   The infrastructure is quite good. They offer core courses like, Mechanical, EEE, ECE and CSE. The faculties are very friendly. 
//   # Heading 2
//   This is text for heading 2.
//   `;
  
//   const wordLimit = 5;
//   const result = splitTextIntoChunks(text, wordLimit);
//   console.log(result);
  

export async function Getstring(formdata: FormData) {
    const file = formdata.getAll("file") as File[];
    for(const files of file){

    
    if(files.size==0 ){
        return {
            ERROR: "No file selected",
        };
    }
    else if(files.type!="text/plain"){
        return {
            ERROR: "Invalid file type. You can only upload text files.",
        };
    }

    else{

    
    const blob = new Blob([files], { type: "text/plain" });
    const buffer = Buffer.from(await blob.arrayBuffer());
    let ids=await Getid();

    const commands = new PutObjectCommand({
        Bucket: "chat-pdf-rk",
        Key: `uploads/${files.name}`,
        Body: buffer,
    });
    try {
        const response = await client.send(commands);
       
    } catch (err) {
       
    }


    const command = new GetObjectCommand({
        Bucket: "chat-pdf-rk",
        Key: `uploads/${files.name}`,
    });

    try {
        const response = await client.send(command);
        if (!response) {
           
        }
        const str = (await response.Body?.transformToString()) as string;
        
        const chunks = split(str, 4000);
        for (const chunk of chunks) {
            const embedding = await GetEmbeddings(chunk);
           
            try {
                await namespace.upsert([
                    { id: ids.toString(), values: embedding, metadata: { data: chunk } },
                ]);
                ids++;
               
            } catch (error) {
               
            }
            
        }
    } catch (err) {
        
    }
    

    finally{
        await setDoc(doc(db, "allowlist", "e0HAWON71Tr6gqfp3EHy"), {
            id:ids,
          }, { merge: true });
    }
}
    }
    return {
        message: "success",
    };
}
