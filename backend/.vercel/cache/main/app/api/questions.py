# backend/app/api/questions.py

from fastapi import APIRouter, HTTPException
from app.schemas.question import QuestionCreate
from app.database import contests_collection
from bson import ObjectId

router = APIRouter()

@router.post("/add")
def add_question(data: QuestionCreate):
    update_result = contests_collection.update_one(
        {"_id": ObjectId(data.contest_id)},
        {"$push": {
            "questions": {
                "title": data.title,
                "description": data.description,
                "sample_input": data.sample_input,
                "sample_output": data.sample_output,
            }
        }}
    )

    if update_result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Contest not found or update failed")

    return {"message": "Question added"}
