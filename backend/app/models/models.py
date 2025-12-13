from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    start_time = Column(TIMESTAMP, nullable=False)
    end_time = Column(TIMESTAMP, nullable=False)
    location = Column(String(255))
    image_url = Column(Text)
    capacity = Column(Integer)
    priority_level = Column(Integer, default=2)
    position = Column(Integer, default=0)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)

    detail = relationship("EventDetail", back_populates="event", uselist=False, cascade="all, delete-orphan")

class EventDetail(Base):
    __tablename__ = "event_details"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"))
    introduction = Column(Text)
    content = Column(Text)
    schedule = Column(Text)
    speakers = Column(Text)
    organizers = Column(Text)
    rules = Column(Text)
    special_requirements = Column(Text)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)

    event = relationship("Event", back_populates="detail")
