from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session, joinedload
import uuid

from app.database import SessionLocal
from app.models.registration import Registration
from app.models.ticket import Ticket
from app.models.event import Event
from app.schemas.registration import RegistrationCreate
from app.utils.email import send_registration_email
from app.utils.qr import generate_qr_image

router = APIRouter(prefix="/registrations", tags=["Registrations"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/{event_id}")
def register(
    event_id: int,
    data: RegistrationCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    # 0. Kiểm tra event tồn tại
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    # 1. Kiểm tra ghế
    seat_exists = db.query(Registration).filter(
        Registration.event_id == event_id,
        Registration.seat_number == data.seat_number
    ).first()
    if seat_exists:
        raise HTTPException(status_code=400, detail="Seat already booked")

    # 2. Lưu registration
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
    db.refresh(ticket)

    # 4. Tạo ảnh QR  ✅ ĐÚNG VỊ TRÍ
    qr_path = generate_qr_image(ticket.qr_code)

    # 5. Gửi email (chạy nền)
    background_tasks.add_task(
        send_registration_email,
        to_email=reg.email,
        event_title=event.title,
        qr_code=ticket.qr_code,
        qr_path=qr_path
    )

    return {
        "message": "Registered successfully",
        "registration_id": reg.id,
        "seat": reg.seat_number,
        "qr_code": ticket.qr_code
    }

@router.get("/by-email")
def get_registrations_by_email(
    email: str,
    db: Session = Depends(get_db)
):
    regs = (
        db.query(Registration)
        .options(joinedload(Registration.event))
        .filter(Registration.email == email)
        .all()
    )

    return [
        {
            "event_id": r.event.id,
            "title": r.event.title,
            "location": r.event.location,
            "start_time": r.event.start_time,
            "end_time": r.event.end_time,
            "seat_number": r.seat_number,
            "status": r.status
        }
        for r in regs
    ]
