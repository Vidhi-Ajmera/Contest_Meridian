from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from app.schemas.user import UserCreate, UserOut, Token
from app.models.user import UserModel
from app.core.security import get_password_hash, verify_password, create_access_token
from app.database import users_collection
from datetime import timedelta
from app.core.config import settings
from jose import jwt, JWTError
import os

router = APIRouter()

# Load JWT config
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


# ========== UTILITY FUNCTION ========== #
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return email  # Only return email here
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


# ========== SIGNUP ========== #
@router.post("/signup", response_model=UserOut)
def signup(user: UserCreate):
    existing = users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_dict = UserModel(
        email=user.email,
        username=user.username,
        hashed_password=get_password_hash(user.password),
        role=user.role,
    ).dict()

    users_collection.insert_one(user_dict)
    return UserOut(**user_dict)


# ========== LOGIN ========== #
@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_collection.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token_data = {
        "sub": user["email"],
        "role": user["role"]
    }

    access_token = create_access_token(
        data=token_data,
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
