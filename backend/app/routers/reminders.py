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
    events = db.query(Event).filter(
        Event.start_time > now,
        Event.start_time <= now + timedelta(hours=24)
    ).all()

    sent = 0
    for event in events:
        registrations = db.query(Registration).filter(
            Registration.event_id == event.id,
            Registration.reminder_sent == False
        ).all()

        for reg in registrations:
            send_reminder_email(
                to_email=reg.email,
                event_title=event.title,
                start_time=event.start_time.strftime("%d/%m/%Y %H:%M")
            )
            reg.reminder_sent = True
            sent += 1

    db.commit()
    return {"message": "Reminder emails sent", "emails_sent": sent}

