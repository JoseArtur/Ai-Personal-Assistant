from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional


class Task(BaseModel):
    id: Optional[str]
    title: Optional[str]
    description: Optional[str]
    user_id: Optional[str]
    due_date: Optional[datetime] = None
    completed_at: Optional[datetime] | Optional[str]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'user_id': self.user_id,
            'due_date': self.due_date,
            'completed_at': self.completed_at,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    def __str__(self):
        return f"User [id={self.id}, title={self.title}, updated_at={self.updated_at}]"
