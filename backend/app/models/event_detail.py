from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class EventDetail(Base):
    __tablename__ = "event_details"

    id = Column(Integer, primary_key=True)
    event_id = Column(Integer, ForeignKey("events.id"), unique=True)
    description = Column(Text)
    agenda = Column(Text)
    speaker = Column(Text)

    event = relationship("Event", back_populates="detail")
