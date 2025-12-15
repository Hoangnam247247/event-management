from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import uuid

from app.database import SessionLocal
from app.models.registration import Registration
from app.models.ticket import Ticket
from app.schemas.registration import RegistrationCreate

router = APIRouter(prefix="/registrations", tags=["Registrations"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/{event_id}")
def register(event_id: int, data: RegistrationCreate, db: Session = Depends(get_db)):
    # 1. Lưu registration (RSVP)
    reg = Registration(
        name=data.name,
        email=data.email,
        event_id=event_id
    )
    db.add(reg)
    db.commit()
    db.refresh(reg)  # để lấy reg.id

    # 2. Tạo ticket cho registration
    ticket = Ticket(
        registration_id=reg.id,
        qr_code=str(uuid.uuid4())
    )
    db.add(ticket)
    db.commit()

    # 3. Trả kết quả
    return {
        "message": "Registered successfully",
        "registration_id": reg.id,
        "qr_code": ticket.qr_code
    }
