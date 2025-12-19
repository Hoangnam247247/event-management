from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.event import Event
from app.models.registration import Registration
from app.utils.email import send_reminder_email

def send_event_reminders():
    db: Session = SessionLocal()
    try:
        now = datetime.now()
        # Lấy tất cả event chưa diễn ra, kể cả vừa tạo vài giờ
        events = db.query(Event).filter(Event.start_time > now).all()

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
        if sent > 0:
            print(f"[{datetime.now()}] Reminder emails sent: {sent}")
    except Exception as e:
        print(f"Error sending reminders: {e}")
        db.rollback()
    finally:
        db.close()


def start_scheduler():
    scheduler = BackgroundScheduler()
    # Chạy scheduler 1 phút/lần để đảm bảo sự kiện mới tạo vài giờ cũng được nhắc
    scheduler.add_job(send_event_reminders, 'interval', minutes=1)
    scheduler.start()
    print("Reminder scheduler started.")
