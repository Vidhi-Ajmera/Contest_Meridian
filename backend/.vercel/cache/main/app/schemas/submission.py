from pydantic import BaseModel

class SubmissionCreate(BaseModel):
    contest_id: str
    question_title: str
    code: str
    language: str

class SubmissionOut(BaseModel):
    contest_id: str
    student_email: str
    question_title: str
    code: str
    language: str
    submitted_at: str
