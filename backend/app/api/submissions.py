# backend/app/api/submissions.py

from fastapi import APIRouter, HTTPException
from app.schemas.submission import SubmissionCreate
from app.models.submission import SubmissionModel
from app.database import submissions_collection
from bson import ObjectId

router = APIRouter()

@router.post("/submit")
def submit_code(sub: SubmissionCreate, student_email: str):
    sub_data = SubmissionModel(
        contest_id=sub.contest_id,
        student_email=student_email,
        question_title=sub.question_title,
        code=sub.code,
        language=sub.language
    ).dict()
    result = submissions_collection.insert_one(sub_data)
    if not result.inserted_id:
        raise HTTPException(status_code=500, detail="Failed to save submission")
    return {"message": "Submission successful"}

@router.get("/by-contest/{contest_id}")
def get_submissions(contest_id: str):
    subs = list(submissions_collection.find({"contest_id": contest_id}))
    for s in subs:
        s["id"] = str(s["_id"])
        del s["_id"]
    return subs
