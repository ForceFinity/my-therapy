from tortoise import fields

from wrap.core.bases import BaseModel


class UserORM(BaseModel):
    username = fields.CharField(max_length=64, unique=True)
    password_hash = fields.CharField(max_length=512)
