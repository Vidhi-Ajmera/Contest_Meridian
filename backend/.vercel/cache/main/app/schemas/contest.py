from pydantic import BaseModel
from typing import List, Optional

class Question(BaseModel):
    title: str
    description: str
    sample_input: str
    sample_output: str

class ContestCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    questions: List[Question]

class ContestOut(BaseModel):
    id: str
    title: str
    description: Optional[str]
    is_active: bool
    questions: List[Question]
