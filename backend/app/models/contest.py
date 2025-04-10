from pydantic import BaseModel, Field
from typing import List
import random
import string

def generate_code(length=6):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

class ContestModel(BaseModel):
    teacher_email: str
    title: str
    description: str
    contest_code: str = Field(default_factory=generate_code)
    is_active: bool = False
    questions: List[dict] = []
