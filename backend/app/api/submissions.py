from fastapi import APIRouter, HTTPException, Depends
from app.schemas.submission import SubmissionCreate
from app.models.submission import SubmissionModel
from app.database import submissions_collection, get_db
from bson import ObjectId

router = APIRouter()

@router.post("/submit")
async def submit_code(sub: SubmissionCreate, student_email: str, db=Depends(get_db)):
    sub_data = SubmissionModel(
        contest_id=sub.contest_id,
        student_email=student_email,
        question_title=sub.question_title,
        code=sub.code,
        language=sub.language
    ).dict()

    # Use asynchronous insert
    result = await submissions_collection.insert_one(sub_data)
    if not result.inserted_id:
        raise HTTPException(status_code=500, detail="Failed to save submission")
    
    return {"message": "Submission successful"}

@router.get("/by-contest/{contest_id}")
async def get_submissions(contest_id: str, db=Depends(get_db)):
    # Use async to get the submissions
    subs_cursor = submissions_collection.find({"contest_id": contest_id})
    subs = await subs_cursor.to_list(length=None)

    for s in subs:
        s["id"] = str(s["_id"])
        del s["_id"]

    return subs
