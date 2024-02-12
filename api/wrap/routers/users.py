__tags__ = ["users"]
__prefix__ = "/users"

from datetime import timedelta

from fastapi import APIRouter, Form, HTTPException
from starlette import status

from wrap.applications.user import UserCRUD, UserPayload, UserResponse, User
from wrap.core.utils import crypto

router = APIRouter()


@router.get("/", response_model=User)
async def get_by(username: str = ""):
    not_found = HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found"
    )
    if username:
        if not (user := await UserCRUD.get_by(username=username)):
            raise not_found

        return (await User.from_tortoise_orm(user)).copy(exclude={"password_hash"})
