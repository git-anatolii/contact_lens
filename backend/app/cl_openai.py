from openai import OpenAI
import chromadb.utils.embedding_functions as embedding_functions
import requests
from bs4 import BeautifulSoup
import PyPDF2
import chromadb
import shutil
import time
import os

from app.core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
        api_key=settings.OPENAI_API_KEY,
        model_name="text-embedding-3-small"
    )

class OpenAIChatter:
    """
    Class to chat OpenAI models
    """
    def __init__(self, model_name, temperature):
        self.model_name = model_name
        self.temperature = temperature
    
    def create_chat(self, assistant, prompt):
        res = client.chat.completions.create(
            model=self.model_name,
            messages=[
                {"role": "system", "content": assistant},
                {"role": "user", "content": prompt}
            ],
            temperature=self.temperature,
        )
        rtn_msg = res.choices[0].message.content
        return rtn_msg
    
class OpenAIFineTuner:
    """
    Class to fine tune OpenAI models
    """
    def __init__(self, training_file_path, model_name, suffix):
        self.training_file_path = training_file_path
        self.model_name = model_name
        self.suffix = suffix
        self.file_object = None
        self.fine_tuning_job = None
        self.model_id = None

    def create_openai_file(self):
        self.file_object = client.files.create(
            file=open(self.training_file_path, "r"),
            purpose="fine-tune",
        )

    def wait_for_file_processing(self, sleep_time=20):
        while self.file_object.status != 'processed':
            time.sleep(sleep_time)
            self.file_object.refresh()
            print("File Status: ", self.file_object.status)

    def create_fine_tuning_job(self):
        self.fine_tuning_job = client.fine_tuning.jobs.create(
            training_file=self.file_object["id"],
            model=self.model_name,
            suffix=self.suffix,
        )

    def wait_for_fine_tuning(self, sleep_time=45):
        while self.fine_tuning_job.status != 'succeeded':
            time.sleep(sleep_time)
            self.fine_tuning_job.refresh()
            print("Job Status: ", self.fine_tuning_job.status)

    def retrieve_fine_tuned_model(self):
        self.model_id = client.fine_tuning.jobs.retrieve(self.fine_tuning_job["id"]).fine_tuned_model
        return self.model_id

    def fine_tune_model(self):
        self.create_openai_file()
        self.wait_for_file_processing()
        self.create_fine_tuning_job()
        self.wait_for_fine_tuning()
        return self.retrieve_fine_tuned_model() 

class Embedder:
    def __init__(self, chroma_path, chunk_size=1000, overlap=200):
        # Initialize OpenAI client and ChromaDB client
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
    
    def get_last_chunk_id(self, collection_name):
        collection = self.chroma_client.get_collection(name=collection_name, embedding_function=openai_ef)
        
        existing_ids = collection.get()['ids']
        
        if existing_ids:
            max_chunk_id = max(int(id.split('_')[1]) for id in existing_ids if id.startswith("chunk_"))
            return max_chunk_id
        return 0

    # Function to embed all chunks from a single PDF and save to ChromaDB
    def embed_pdf_chunks_to_chroma(self, pdf_file, collection_name):
        text = self.extract_text_from_pdf(pdf_file)
        chunks = self.chunk_text(text)

        openai_ef = embedding_functions.OpenAIEmbeddingFunction(
            api_key=settings.OPENAI_API_KEY,
            model_name="text-embedding-3-small"
        )
        
        collection = self.chroma_client.get_or_create_collection(name=collection_name, embedding_function=openai_ef, metadata={"hnsw:space": "cosine"})
        
        last_chunk_id = self.get_last_chunk_id(collection_name)

        for i, chunk in enumerate(chunks):
            chunk_id = f"chunk_{last_chunk_id + 1 + i}"
            metadata = {"chunk_id": chunk_id, "content": chunk, "document_name": os.path.basename(pdf_file)}

            # Add embedding and metadata to Chroma
            collection.add(
                documents=[chunk],
                ids=[chunk_id],
                metadatas=[metadata]
            )

        print(f"Embeddings from {pdf_file} saved to Chroma collection: {collection_name}")

        destination_folder = "./embedding_db/all_pdfs"
        os.makedirs(destination_folder, exist_ok=True)
        shutil.move(pdf_file, os.path.join(destination_folder, os.path.basename(pdf_file)))
        print(f"Moved {pdf_file} to {destination_folder}")

    # Function to scrape text from a webpage
    def scrape_website_content(self, url):
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            body_text = soup.body.get_text(separator=' ', strip=True)
            return body_text
        else:
            print(f"Failed to retrieve content from {url}: {response.status_code}")
            return
        
    def embed_website_to_chroma(self, url, collection_name):
        text = self.scrape_website_content(url)
        if text:
            chunks = self.chunk_text(text)
            
            collection = self.chroma_client.get_or_create_collection(name=collection_name, embedding_function=openai_ef, metadata={"hnsw:space": "cosine"})

            last_chunk_id = self.get_last_chunk_id(collection_name)

            for i, chunk in enumerate(chunks):
                chunk_id = f"chunk_{last_chunk_id + 1 + i}"
                metadata = {"chunk_id": chunk_id, "content": chunk, "document_name": url}

                collection.add(
                    documents=[chunk],
                    ids=[chunk_id],
                    metadatas=[metadata]
                )

            print(f"Embeddings from {url} saved to Chroma collection: {collection_name}")
        
    # Function to process all PDF files in a folder
    def embed_pdfs_in_folder(self, folder_path, collection_name):
        pdf_files = [os.path.join(folder_path, file) for file in os.listdir(folder_path) if file.endswith('.pdf')]
        
        if not pdf_files:
            print("No PDF files found in the folder.")
            return

        for pdf_file in pdf_files:
            print(f"Processing {pdf_file}...")
            self.embed_pdf_chunks_to_chroma(pdf_file, collection_name)

    def query(self, query_text, collection_name, top_k=5):

        collection = self.chroma_client.get_collection(name=collection_name, embedding_function=openai_ef)

        results = collection.query(
            query_texts=query_text,
            n_results=top_k
        )

        response = []
        for doc, metadata in zip(results['documents'][0], results['metadatas'][0]):
            response.append({
                "content": doc,
                "metadata": metadata
            })

        return response
