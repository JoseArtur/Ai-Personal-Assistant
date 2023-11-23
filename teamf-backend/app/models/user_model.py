from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    id: Optional[str] = None
    username: str
    email: str
    password: Optional[str] = None
    created_at: Optional[datetime] = None

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password,
            'created_at': self.created_at
        }

    def __str__(self):
        return f"User [id={self.id}, username={self.username}, email={self.email}]"
