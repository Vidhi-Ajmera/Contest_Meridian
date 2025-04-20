from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api import auth, contest, questions, submissions
from app.database import init_db

# Initialize FastAPI app
app = FastAPI()

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust if hosted elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize DB connection
init_db()

# Root route
@app.get("/")
async def root():
    return JSONResponse(content={"message": "Hello World"})

# Include routers
app.include_router(auth.router, prefix="/auth")
app.include_router(contest.router, prefix="/contest")
app.include_router(questions.router, prefix="/questions")
app.include_router(submissions.router, prefix="/submissions")
