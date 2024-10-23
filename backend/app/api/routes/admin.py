from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from fastapi.responses import StreamingResponse
from typing import Annotated, Any, List
from datetime import timedelta

from app.cl_openai import Embedder, OpenAIChatter
from app.models import (
    Message, 
    ScrapeRequest, 
    TokenWithUser, 
    UserLogin,
    AdminLogin,
    UserPublic
    
)
from app.api.deps import (
    CurrentUser,
    SessionDep,
)
from app.core.config import settings
from app.core import security
from app import crud

router = APIRouter()

# User
# Login
@router.post("/login", response_model=TokenWithUser)
def login_access_token(session: SessionDep, user_in: AdminLogin):
    user: UserPublic = crud.authenticate(
        session=session, email=user_in.email, password=user_in.password
    )
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_superuser:
        raise HTTPException(status_code=400, detail="Not allowed")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token=security.create_access_token(user.id, expires_delta=access_token_expires)
    return TokenWithUser(access_token=access_token, user=user)

# NLP
embedder = Embedder(chroma_path="./embedding_db/chroma")
chatter = OpenAIChatter(model_name="gpt-4o", temperature=0)

@router.post("/upload/pdf")
async def upload_pdf(files: List[UploadFile] = File(...)):
    if not files:  # If no files were uploaded
        raise HTTPException(status_code=400, detail="No files uploaded")
    
    saved_files = []
    
    for file in files:
        if file.content_type != "application/pdf":
            raise HTTPException(
                status_code=400,
                detail=f"File '{file.filename}' is not a PDF",
            )
        
        file_location = f"./embedding_db/uploads/{file.filename}"
        
        with open(file_location, "wb") as pdf_file:
            pdf_file.write(await file.read())
        
        saved_files.append(file.filename)
    
    return {"info": f"Files uploaded successfully: {', '.join(saved_files)}"}

@router.get("/train/pdf/start")
async def train_pdf_start():
    folder_path = "./embedding_db/uploads"
    collection_name = "embeddings"
    try:
        embedder.embed_pdfs_in_folder(folder_path, collection_name)
        return Message(message="Trained Successfully")
    except Exception as e:
        raise HTTPException(
                status_code=400,
                detail="Train Failed",
        )
        
@router.post("/train/scrape/start")
async def train_scrape_start(scraperequest: ScrapeRequest):
    collection_name = "embeddings"
    try:
        embedder.embed_website_to_chroma(scraperequest.url, collection_name)
        return Message(message="Trained Successfully")
    except Exception as e:
        raise HTTPException(
                status_code=400,
                detail="Train Failed",
        )
    
@router.post("/test/bot")
async def test_bot(message: Message):
    # Query the embeddings database
    results = embedder.query(message.message, collection_name="embeddings")

    # Format the results for the prompt, including source information
    formatted_results = "\n\n".join([f"{item['metadata']['document_name']}\nContent: {item['content']}" for item in results])
    print(formatted_results)

    # Create a focused prompt for the assistant, including a request to mention the sources
    prompt = f"""
        I have retrieved the following relevant information from the database:

        {formatted_results}

        Please answer the user's question **based only on the information provided above**.
        When you provide your answer, also mention the **source document name** for any information you use.
        If the correct answer cannot be found in these documents, simply respond with "I don't know well".
        Be concise and only answer based on what is explicitly mentioned in the content. Do not make assumptions.

        user's question: {message.message}
    """

    # Call to the chat assistant
    response = chatter.create_chat(assistant="You are an expert assistant about Contact Lens.", prompt=prompt)

    return response
