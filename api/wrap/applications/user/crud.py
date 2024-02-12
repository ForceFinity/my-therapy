from .models import UserORM
from .schemas import UserPayload, UserSchema
from wrap.core.utils import crypto
from wrap.core.bases import BaseCRUD


class UserCRUD(BaseCRUD):
    model = UserORM

    @classmethod
    async def create_by(cls, payload: UserPayload) -> model:
        password_hash = crypto.get_password_hash(payload.password)

        hashed_payload = UserSchema(
            username=payload.username,
            password_hash=password_hash
        )

        return await super().create_by(hashed_payload)

    @classmethod
    async def authenticate_user(cls, username: str, password: str) -> model | bool:
        user = await cls.get_by(username=username)

        if not user:
            return False

        if not crypto.verify_password(password, user.password_hash):
            return False

        return user
