from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.event import Event
from app.models.registration import Registration
from app.utils.email import send_reminder_email

def send_reminders_job():
    db: Session = SessionLocal()
    try:
        now = datetime.now()
        next_24h = now + timedelta(hours=24)

        events = db.query(Event).filter(
            Event.start_time > now,
            Event.start_time <= next_24h
        ).all()

        sent_count = 0

        for event in events:
            registrations = db.query(Registration).filter(
                Registration.event_id == event.id,
                Registration.reminder_sent == False
            ).all()

            for reg in registrations:
                send_reminder_email(
                    to_email=reg.email,
                    event_title=event.title,
                    start_time=event.start_time
                )
                reg.reminder_sent = True
                sent_count += 1

        db.commit()
        print(f"[REMINDER JOB] Sent {sent_count} reminder(s)")

    except Exception as e:
        print("[REMINDER JOB ERROR]", e)

    finally:
        db.close()
