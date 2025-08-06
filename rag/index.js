import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import * as dotenv from "dotenv";
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';
dotenv.config();

async function indexDocument(){
    const PDF_PATH = './dsa.pdf';
    const pdfLoader = new PDFLoader(PDF_PATH);
    const rawDocs = await pdfLoader.load();
    console.log("pdf loaded");
    
   
    //chunking
    
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000, //chunk ke andar 1000 words
    chunkOverlap: 200,
  });
const chunkedDocs = await textSplitter.splitDocuments(rawDocs);
console.log("text split into chunks");


 //vector embeed model
 const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: 'text-embedding-004',
  });
  console.log("text embeed configuration");
  

  //database ko bhi configure

  const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME);
 console.log(" db configure");
//langchain kaise work karega data store embeeding and chunking krne me

await PineconeStore.fromDocuments(chunkedDocs, embeddings, {
    pineconeIndex,
    maxConcurrency: 5, //maxConcurrency ka mtlb jo hmne chunks bnaye hai hai unhe 5-5 krke db me store karo
  });
   console.log("vectors stores in db");
 
  
    
}

indexDocument();