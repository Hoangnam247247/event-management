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
    # 0. Kiểm tra event tồn tại
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        return {"error": "Event not found"}

    # 1. Kiểm tra ghế đã được đặt chưa
    seat_exists = db.query(Registration).filter(
        Registration.event_id == event_id,
        Registration.seat_number == data.seat_number
    ).first()

    if seat_exists:
        return {"error": "Seat already booked"}

    # 2. Lưu registration (RSVP + seat)
    reg = Registration(
        name=data.name,
        email=data.email,
        event_id=event_id,
        seat_number=data.seat_number
    )
    db.add(reg)
    db.commit()
    db.refresh(reg)

    # 3. Tạo ticket
    ticket = Ticket(
        registration_id=reg.id,
        qr_code=str(uuid.uuid4())
    )
    db.add(ticket)
    db.commit()

    # 4. Gửi email xác nhận ngay
    send_registration_email(
        to_email=reg.email,
        event_title=event.title,
        qr_code=ticket.qr_code
    )

    # 5. Trả kết quả
    return {
        "message": "Registered successfully",
        "registration_id": reg.id,
        "seat": reg.seat_number,
        "qr_code": ticket.qr_code
    }
