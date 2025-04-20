from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api import auth, contest, questions, submissions
from app.database import init_db
from mangum import Mangum


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use "*" or your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

@app.get("/")
async def root():
    return JSONResponse(content={"message": "Hello World"})

app.include_router(auth.router, prefix="/auth")
app.include_router(contest.router, prefix="/contest")
app.include_router(questions.router, prefix="/questions")
app.include_router(submissions.router, prefix="/submissions")

# 🆕 Required for Vercel serverless handler
handler = app
