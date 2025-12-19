from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship   # ← thêm dòng này
from app.database import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True)
    registration_id = Column(Integer, ForeignKey("registrations.id"), nullable=False)
    qr_code = Column(String, nullable=False)

    # relationship với Registration
    registration = relationship("Registration", back_populates="ticket")
