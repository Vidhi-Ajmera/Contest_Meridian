# backend/app/database.py

from pymongo import MongoClient
import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("DB_NAME", "contest_platform")

client = AsyncIOMotorClient(MONGODB_URI)
db = client[DB_NAME]

def init_db():
    print("Database initialized")
    
def get_db():
    return db

users_collection = db["users"]
contests_collection = db["contests"]
submissions_collection = db["submissions"]
