from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class Message(BaseModel):
    name: str = Field(..., example="Ansh Sharma")
    email: EmailStr = Field(..., example="ansh@example.com")
    subject: Optional[str] = Field(None, example="Portfolio Inquiry")
    message: str = Field(..., example="Hey! I really like your portfolio.")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
