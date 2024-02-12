__tags__ = ["users", "oauth2"]
__prefix__ = "/oauth2"

from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, HTTPException, Depends, status, Header, Form

from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError

from wrap.applications.user import Token, UserCRUD
from wrap.applications.user.schemas import TokenDecoded, UserPayload, UserResponse, User
from wrap.core.utils import crypto

router = APIRouter()


@router.post("/", response_model=Token)
async def auth_for_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    user = await UserCRUD.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=crypto.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = crypto.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )

    return Token(accessToken=access_token)


@router.get("/verify/", response_model=TokenDecoded)
async def verify_token(token: str = Header(alias="Authorization")):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        token_data = crypto.decode_jwt(token)
        if not token_data.sub:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    if not await UserCRUD.get_by(username=token_data.sub):
        raise credentials_exception

    return token_data


@router.post("/sign-up/", response_model=UserResponse)
async def sign_up(username: str = Form(), password: str = Form()):
    if await UserCRUD.get_by(username=username):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists"
        )

    access_token_expires = timedelta(minutes=crypto.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = crypto.create_access_token(
        data={"sub": username}, expires_delta=access_token_expires
    )

    user = await UserCRUD.create_by(
        UserPayload(username=username, password=password)
    )
    resp = UserResponse(
        **(await User.from_tortoise_orm(user)).model_dump(),
        access_token=access_token
    )

    return resp.copy(exclude={"password_hash"})
