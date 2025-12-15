from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.event import Event
from app.models.event_detail import EventDetail
from app.models.registration import Registration
from app.schemas.event import EventCreate

router = APIRouter(prefix="/events", tags=["Events"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ===============================
# CREATE EVENT
# ===============================
@router.post("/")
def create_event(data: EventCreate, db: Session = Depends(get_db)):
    event = Event(
        title=data.title,
        start_time=data.start_time,
        end_time=data.end_time,
        location=data.location
    )
    db.add(event)
    db.commit()
    db.refresh(event)

    if data.detail:
        detail = EventDetail(
            event_id=event.id,
            description=data.detail.description,
            agenda=data.detail.agenda,
            speaker=data.detail.speaker
        )
        db.add(detail)
        db.commit()

    return event

# ===============================
# GET ALL EVENTS
# ===============================
@router.get("/")
def get_events(db: Session = Depends(get_db)):
    return db.query(Event).all()

# ===============================
# GET BOOKED SEATS FOR EVENT
# ===============================
@router.get("/{event_id}/seats")
def get_booked_seats(event_id: int, db: Session = Depends(get_db)):
    seats = db.query(Registration.seat_number).filter(
        Registration.event_id == event_id,
        Registration.seat_number != None
    ).all()

    # convert list of tuples -> list of strings
    return [s[0] for s in seats]
