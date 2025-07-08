from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace "*" with the exact frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str

API_URL = "https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base"
HEADERS = {
    "Authorization": f"Bearer {os.getenv('HF_API_KEY')}"
}

@app.post("/analyze")
async def analyze_emotion(data: TextInput):
    async with httpx.AsyncClient() as client:
        response = await client.post(API_URL, headers=HEADERS, json={"inputs": data.text})
        result = response.json()

    if isinstance(result, dict) and "error" in result:
        return {"error": result["error"]}

    top_emotion = max(result[0], key=lambda x: x["score"])
    return {
        "emotion": top_emotion["label"],
        "confidence": round(top_emotion["score"], 2)
    }
