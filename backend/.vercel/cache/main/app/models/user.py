from pydantic import BaseModel, EmailStr
from typing import Literal

class UserModel(BaseModel):
    email: EmailStr
    username: str
    hashed_password: str
    role: Literal["teacher", "student"]
