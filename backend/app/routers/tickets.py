from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.ticket import Ticket
from app.schemas.ticket import TicketResponse

router = APIRouter(prefix="/tickets", tags=["Tickets"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/registration/{registration_id}", response_model=TicketResponse)
def get_ticket_by_registration(registration_id: int, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(
        Ticket.registration_id == registration_id
    ).first()

    if not ticket:
        return {"error": "Ticket not found"}

    return ticket
