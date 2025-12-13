from pydantic import BaseModel
from typing import Optional

class EventBase(BaseModel):
    title: str
    start_time: str
    end_time: str
    location: Optional[str] = None
    image_url: Optional[str] = None
    capacity: Optional[int] = None
    priority_level: Optional[int] = 2
    position: Optional[int] = 0

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    title: Optional[str]
    start_time: Optional[str]
    end_time: Optional[str]
    location: Optional[str]
    image_url: Optional[str]
    capacity: Optional[int]
    priority_level: Optional[int]
    position: Optional[int]

class EventOut(EventBase):
    id: int
    class Config:
        orm_mode = True

class EventDetailBase(BaseModel):
    introduction: Optional[str]
    content: Optional[str]
    schedule: Optional[str]
    speakers: Optional[str]
    organizers: Optional[str]
    rules: Optional[str]
    special_requirements: Optional[str]

class EventDetailCreate(EventDetailBase):
    event_id: int

class EventDetailUpdate(EventDetailBase):
    pass

class EventDetailOut(EventDetailBase):
    id: int
    event_id: int
    class Config:
        orm_mode = True
