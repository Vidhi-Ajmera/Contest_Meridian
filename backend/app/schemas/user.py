from pydantic import BaseModel, EmailStr
from typing import Literal

class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    role: Literal["teacher", "student"]

class UserOut(BaseModel):
    email: EmailStr
    username: str
    role: str

class Token(BaseModel):
    access_token: str
    token_type: str
