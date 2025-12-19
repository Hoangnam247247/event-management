from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class EventDetailCreate(BaseModel):
    description: str | None = None
    agenda: str | None = None
    speaker: str | None = None

class EventCreate(BaseModel):
    title: str
    start_time: datetime
    end_time: datetime
    location: str
    detail: EventDetailCreate | None = None
class EventUpdate(BaseModel):
    title: str
    start_time: datetime
    end_time: datetime
    location: str