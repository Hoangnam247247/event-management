from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True)
    registration_id = Column(Integer, ForeignKey("registrations.id"), nullable=False)
    qr_code = Column(String, nullable=False)
