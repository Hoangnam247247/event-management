from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.database import SessionLocal
from app.models.ticket import Ticket
from app.models.registration import Registration
from app.schemas.ticket import TicketResponse

router = APIRouter(prefix="/tickets", tags=["Tickets"])

# Dependency để lấy DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# GET: lấy ticket theo registration_id
@router.get("/registration/{registration_id}", response_model=TicketResponse)
def get_ticket_by_registration(registration_id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.registration_id == registration_id).first()

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return ticket


# POST: check-in bằng qr_code
@router.post("/check-in/{qr_code}")
def check_in(qr_code: str, db: Session = Depends(get_db)):
    ticket = (
        db.query(Ticket)
        .options(joinedload(Ticket.registration))
        .filter(Ticket.qr_code == qr_code)
        .first()
    )

    if not ticket:
        raise HTTPException(status_code=404, detail="Invalid QR code")

    reg = ticket.registration

    if reg.status == "checked-in":
        return {
            "message": "Ticket already checked-in",
            "status": reg.status
        }

    # Cập nhật trạng thái check-in
    reg.status = "checked-in"
    db.commit()

    return {
        "message": "Check-in successful",
        "name": reg.name,
        "email": reg.email,
        "seat": reg.seat_number,
        "status": reg.status
    }
