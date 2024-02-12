import os
from datetime import datetime, timezone, timedelta

from jose import jwt
from passlib.context import CryptContext

from wrap.applications.user.schemas import TokenDecoded

SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = "HS512"
ACCESS_TOKEN_EXPIRE_MINUTES = 28 * 24 * 60
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)

    to_encode = data.copy()
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


def verify_password(password, hashed_password):
    return pwd_context.verify(password, hashed_password)


def decode_jwt(token: str) -> TokenDecoded:
    return TokenDecoded(
        **jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    )
