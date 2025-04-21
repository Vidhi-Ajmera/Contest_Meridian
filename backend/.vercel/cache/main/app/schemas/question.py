from pydantic import BaseModel

class QuestionCreate(BaseModel):
    contest_id: str
    title: str
    description: str
    sample_input: str
    sample_output: str
