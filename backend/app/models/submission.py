from pydantic import BaseModel
from datetime import datetime

class SubmissionModel(BaseModel):
    contest_id: str
    student_email: str
    question_title: str
    code: str
    language: str
    submitted_at: datetime = datetime.utcnow()
