from typing import Optional
from datetime import datetime
import uuid

from pydantic import EmailStr
from sqlmodel import Field, Relationship, SQLModel

class Message(SQLModel):
    message: str
    
class UserBase(SQLModel):
    name: str = Field(max_length=255)
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    is_superuser: bool = False
    is_active: bool = True
    firstName: Optional[str] = Field(default=None, max_length=255)
    lastName: Optional[str] = Field(default=None, max_length=255)
    phoneNumber: Optional[str] = Field(default=None, max_length=40)
    createdAt: Optional[datetime] = Field(default_factory=datetime.now)

class UserCreate(UserBase):
    password: str = Field(max_length=40)

class UserRegister(SQLModel):
    name: str = Field(max_length=255)
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    password: str = Field(max_length=40)

class UserLogin(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    password: str = Field(max_length=40)
    remember_me: bool

class AdminLogin(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    password: str = Field(max_length=40)

class UserUpdate(UserBase):
    password: str = Field(max_length=40)
    confirmPassword: str = Field(max_length=40)

class UserUpdateMe(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=255)
    firstName: str = Field(default=None, max_length=255)
    lastName: str = Field(default=None, max_length=255)
    phoneNumber: str = Field(default=None, max_length=40)
    
class UpdatePassword(SQLModel):
    current_password: str = Field(max_length=40)
    new_password: str = Field(max_length=40)

class NLP_User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str

class UserPublic(UserBase):
    id: uuid.UUID

class TokenWithUser(SQLModel):
    access_token: str
    token_type: str = "bearer"
    user: UserPublic

class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int

class TokenPayload(SQLModel):
    sub: uuid.UUID | None = None

class NewPassword(SQLModel):
    token: str
    new_password: str = Field(max_length=40)

class ScrapeRequest(SQLModel):
    url: str

