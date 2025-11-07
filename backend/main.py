from fastapi import FastAPI, HTTPException
from models import Message
from database import db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Portfolio Backend")

# CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace * with your frontend URL later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/contact")
async def submit_message(message: Message):
    """Store a new contact message"""
    result = await db.messages.insert_one(message.dict())
    if result.inserted_id:
        return {"status": "success", "message_id": str(result.inserted_id)}
    raise HTTPException(status_code=500, detail="Message could not be saved.")

@app.get("/messages")
async def get_messages():
    """Get all stored messages"""
    messages = await db.messages.find().to_list(100)
    for m in messages:
        m["_id"] = str(m["_id"])  # convert ObjectId to string
    return messages
