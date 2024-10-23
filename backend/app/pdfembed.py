import PyPDF2
import chromadb
from openai import OpenAI

import os
import PyPDF2
import chromadb
from openai import OpenAI

class PDFEmbedder:
    def __init__(self, openai_api_key, chroma_path, chunk_size=1000, overlap=200):
        # Initialize OpenAI client and ChromaDB client
        self.client = OpenAI(api_key=openai_api_key)
        self.chroma_client = chromadb.PersistentClient(path=chroma_path)
        self.chunk_size = chunk_size
        self.overlap = overlap

    # Function to read text from a PDF file
    def extract_text_from_pdf(self, pdf_file):
        reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
        return text

    # Function to chunk text with overlap
    def chunk_text(self, text):
        chunks = []
        start = 0
        while start < len(text):
            end = min(start + self.chunk_size, len(text))
            chunks.append(text[start:end])
            start += self.chunk_size - self.overlap
        return chunks

    # Function to get embedding for each chunk
    def get_embedding(self, text, model="text-embedding-3-small"):
        text = text.replace("\n", " ")
        return self.client.embeddings.create(input=[text], model=model).data[0].embedding

    # Function to embed all chunks from a single PDF and save to ChromaDB
    def embed_pdf_chunks_to_chroma(self, pdf_file, collection_name):
        # Step 1: Extract text from PDF
        text = self.extract_text_from_pdf(pdf_file)
        chunks = self.chunk_text(text)

        # Step 2: Create or get the Chroma collection
        collection = self.chroma_client.get_or_create_collection(name=collection_name)
        
        # Step 3: Generate embeddings for each chunk and add them to ChromaDB
        for i, chunk in enumerate(chunks):
            embedding = self.get_embedding(chunk)
            chunk_id = f"chunk_{i}"
            metadata = {"chunk_id": chunk_id, "content": chunk, "document_name": os.path.basename(pdf_file)}

            # Add embedding and metadata to Chroma
            collection.add(
                documents=[chunk],  # Storing the chunk itself
                embeddings=[embedding],  # Storing the corresponding embedding
                ids=[chunk_id],  # Unique ID for the chunk
                metadatas=[metadata]  # Storing metadata
            )

        print(f"Embeddings from {pdf_file} saved to Chroma collection: {collection_name}")

    # Function to process all PDF files in a folder
    def embed_pdfs_in_folder(self, folder_path, collection_name):
        # List all PDF files in the folder
        pdf_files = [os.path.join(folder_path, file) for file in os.listdir(folder_path) if file.endswith('.pdf')]
        
        if not pdf_files:
            print("No PDF files found in the folder.")
            return

        # Process each PDF file
        for pdf_file in pdf_files:
            print(f"Processing {pdf_file}...")
            self.embed_pdf_chunks_to_chroma(pdf_file, collection_name)

        print(f"All PDF files in {folder_path} have been embedded into Chroma collection: {collection_name}")

