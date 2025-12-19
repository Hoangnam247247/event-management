from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    seat_number = Column(String)
    status = Column(String, default="registered")
    event_id = Column(Integer, ForeignKey("events.id"))

    event = relationship("Event", back_populates="registrations")
    ticket = relationship("Ticket", back_populates="registration", uselist=False)
    reminder_sent = Column(Boolean, default=False)

