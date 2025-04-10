from fastapi import FastAPI
from app.api import auth, contest, questions, submissions
from app.database import init_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(auth.router, prefix="/auth")
app.include_router(contest.router, prefix="/contest")
app.include_router(questions.router, prefix="/questions")
app.include_router(submissions.router, prefix="/submissions")
