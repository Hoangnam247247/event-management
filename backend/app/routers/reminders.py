from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.database import SessionLocal
from app.models.event import Event
from app.models.registration import Registration
from app.utils.email import send_reminder_email

router = APIRouter(prefix="/reminders", tags=["Reminders"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/send")
def send_event_reminders(db: Session = Depends(get_db)):
    now = datetime.now()
    next_24h = now + timedelta(hours=24)

    events = db.query(Event).filter(
        Event.start_time >= now,
        Event.start_time <= next_24h
    ).all()

    sent = 0

    for event in events:
        registrations = db.query(Registration).filter(
            Registration.event_id == event.id
        ).all()

        for reg in registrations:
            send_reminder_email(
                to_email=reg.email,
                event_title=event.title,
                start_time=str(event.start_time)
            )
            sent += 1

    return {
        "message": "Reminder emails sent",
        "emails_sent": sent
    }
