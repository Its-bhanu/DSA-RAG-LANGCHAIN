# DSA-RAG-LANGCHAIN
# DSA-RAG-LANGCHAIN

This project implements a Retrieval-Augmented Generation (RAG) system for answering Data Structures and Algorithms (DSA) questions using LangChain, Google Gemini, and Pinecone.

## Features

- Loads a DSA PDF, splits it into chunks, and generates embeddings.
- Stores embeddings in a Pinecone vector database.
- Accepts user questions, rewrites them for clarity, and retrieves relevant context from the database.
- Uses Google Gemini to generate answers based only on the retrieved context.

## Setup

1. **Clone the repository** and navigate to the `rag` directory.
2. **Install dependencies:**
   ```sh
   npm install

   GEMINI_API_KEY=your_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_env
PINECONE_INDEX_NAME=your_index_name


