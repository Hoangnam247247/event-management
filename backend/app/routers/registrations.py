from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import uuid

from app.database import SessionLocal
from app.models.registration import Registration
from app.models.ticket import Ticket
from app.models.event import Event
from app.schemas.registration import RegistrationCreate
from app.utils.email import send_registration_email

router = APIRouter(prefix="/registrations", tags=["Registrations"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/{event_id}")
def register(event_id: int, data: RegistrationCreate, db: Session = Depends(get_db)):
    # 0. Lấy thông tin event
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        return {"error": "Event not found"}

    # 1. Lưu registration (RSVP)
    reg = Registration(
        name=data.name,
        email=data.email,
        event_id=event_id
    )
    db.add(reg)
    db.commit()
    db.refresh(reg)

    # 2. Tạo ticket
    ticket = Ticket(
        registration_id=reg.id,
        qr_code=str(uuid.uuid4())
    )
    db.add(ticket)
    db.commit()

    # 3. GỬI EMAIL NGAY LẬP TỨC (ĐÚNG CHỖ)
    send_registration_email(
        to_email=reg.email,
        event_title=event.title,
        qr_code=ticket.qr_code
    )

    # 4. Trả kết quả
    return {
        "message": "Registered successfully",
        "registration_id": reg.id,
        "qr_code": ticket.qr_code
    }
