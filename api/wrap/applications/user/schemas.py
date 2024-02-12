import datetime

from pydantic import BaseModel
from tortoise.contrib.pydantic import pydantic_model_creator

from wrap.applications.user.models import UserORM

User = pydantic_model_creator(UserORM)


class UserResponse(User):
    access_token: str


class Token(BaseModel):
    accessToken: str


class TokenDecoded(BaseModel):
    sub: str | None
    exp: int | None


class UserBase(BaseModel):
    username: str


class UserSchema(UserBase):
    password_hash: str


class UserPayload(UserBase):
    password: str
