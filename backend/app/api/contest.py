# backend/app/api/contest.py

from fastapi import APIRouter, HTTPException, Depends
from app.schemas.contest import ContestCreate
from app.models.contest import ContestModel
from app.database import contests_collection
from bson import ObjectId
from app.database import get_db
from app.api.auth import get_current_user

router = APIRouter()

@router.post("/create")
async def create_contest(contest: ContestCreate, current_user: str = Depends(get_current_user), db=Depends(get_db)):
    model = ContestModel(
        teacher_email=current_user,
        title=contest.title,
        description=contest.description,
        questions=contest.questions
    )
    result = await db["contests"].insert_one(model.dict())
    return {
        "id": str(result.inserted_id),
        "contest_code": model.contest_code
    }


@router.post("/start/{contest_id}")
def start_contest(contest_id: str):
    updated = contests_collection.update_one(
        {"_id": ObjectId(contest_id)},
        {"$set": {"is_active": True}}
    )
    if updated.modified_count == 0:
        raise HTTPException(404, "Contest not found")
    return {"message": "Contest started"}

@router.post("/end/{contest_id}")
def end_contest(contest_id: str):
    updated = contests_collection.update_one(
        {"_id": ObjectId(contest_id)},
        {"$set": {"is_active": False}}
    )
    if updated.modified_count == 0:
        raise HTTPException(404, "Contest not found")
    return {"message": "Contest ended"}

@router.get("/all")
def get_all_contests():
    contests = list(contests_collection.find())
    for contest in contests:
        contest["id"] = str(contest["_id"])
        del contest["_id"]
    return contests

@router.get("/active")
def get_active_contests(db=Depends(get_db)):
    contests = list(db["contests"].find({"is_active": True}))
    for c in contests:
        c["id"] = str(c["_id"])
        del c["_id"]
    return contests

@router.get("/teacher/mycontest")
def get_teacher_contests(current_user: str = Depends(get_current_user), db=Depends(get_db)):
    contests = list(db["contests"].find({"teacher_email": current_user}))
    for c in contests:
        c["id"] = str(c["_id"])
        del c["_id"]
    return contests

