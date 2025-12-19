from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func, case
from datetime import datetime, timedelta

from app.database import SessionLocal
from app.models.event import Event
from app.models.event_detail import EventDetail
from app.models.registration import Registration
from app.schemas.event import EventCreate
from app.schemas.event import EventUpdate

router = APIRouter(prefix="/events", tags=["Events"])

# ===============================
# DATABASE DEPENDENCY
# ===============================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ===============================
# CREATE EVENT
# ===============================
from datetime import datetime
from fastapi import HTTPException

@router.post("/")
def create_event(data: EventCreate, db: Session = Depends(get_db)):
    now = datetime.now()

    if data.start_time < now:
        raise HTTPException(
            status_code=400,
            detail="Không được tạo sự kiện trong quá khứ"
        )

    if data.end_time <= data.start_time:
        raise HTTPException(
            status_code=400,
            detail="Thời gian kết thúc phải sau thời gian bắt đầu"
        )

    event = Event(
        title=data.title,
        start_time=data.start_time,
        end_time=data.end_time,
        location=data.location
    )

    db.add(event)
    db.commit()
    db.refresh(event)
    return event


# ===============================
# GET ALL EVENTS
# ===============================
@router.get("/")
def get_events(db: Session = Depends(get_db)):
    return db.query(Event).options(joinedload(Event.detail)).all()

# ===============================
# GET BOOKED SEATS
# ===============================
@router.get("/{event_id}/seats")
def get_booked_seats(event_id: int, db: Session = Depends(get_db)):
    seats = db.query(Registration.seat_number).filter(
        Registration.event_id == event_id,
        Registration.seat_number.isnot(None)
    ).all()
    return [s[0] for s in seats]

# ===============================
# DELETE EVENT
# ===============================
@router.delete("/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    reg_count = db.query(Registration).filter(
        Registration.event_id == event_id
    ).count()

    if reg_count > 0:
        raise HTTPException(
            status_code=400,
            detail="Cannot delete event with registrations"
        )

    db.delete(event)
    db.commit()
    return {"message": "Event deleted"}

# ===============================
# STATS SUMMARY (USER / DASHBOARD)
# ===============================
@router.get("/stats/summary")
def event_stats_summary(db: Session = Depends(get_db)):
    now = datetime.now()
    start_of_week = now - timedelta(days=now.weekday())
    start_of_month = now.replace(day=1)

    total_events = db.query(Event).count()
    total_tickets = db.query(Registration).count()

    events_this_week = db.query(Event).filter(
        Event.start_time >= start_of_week
    ).count()

    events_this_month = db.query(Event).filter(
        Event.start_time >= start_of_month
    ).count()

    checked_in = db.query(Registration).filter(
        Registration.status == "checked-in"
    ).count()

    return {
        "total_events": total_events,
        "total_tickets": total_tickets,
        "events_this_week": events_this_week,
        "events_this_month": events_this_month,
        "checked_in": checked_in,
        "not_checked_in": total_tickets - checked_in
    }

# ===============================
# ADMIN STATS (TOP CARDS)
# ===============================
@router.get("/admin/stats")
def admin_stats(db: Session = Depends(get_db)):
    now = datetime.now()
    start_of_week = now - timedelta(days=now.weekday())
    start_of_month = now.replace(day=1)

    total_events = db.query(Event).count()
    total_tickets = db.query(Registration).count()

    events_this_week = db.query(Event).filter(
        Event.start_time >= start_of_week
    ).count()

    events_this_month = db.query(Event).filter(
        Event.start_time >= start_of_month
    ).count()

    checked_in = db.query(Registration).filter(
        Registration.status == "checked-in"
    ).count()

    return {
        "total_events": total_events,
        "total_tickets": total_tickets,
        "events_this_week": events_this_week,
        "events_this_month": events_this_month,
        "checked_in": checked_in
    }

# ===============================
# ADMIN EVENTS TABLE
# ===============================
@router.get("/admin/events")
def admin_events(db: Session = Depends(get_db)):
    events = db.query(Event).all()

    stats = (
        db.query(
            Registration.event_id,
            func.count(Registration.id).label("total_tickets"),
            func.sum(
                case(
                    (Registration.status == "checked-in", 1),
                    else_=0
                )
            ).label("checked_in")
        )
        .group_by(Registration.event_id)
        .all()
    )

    stats_map = {
        s.event_id: {
            "total_tickets": s.total_tickets,
            "checked_in": s.checked_in
        }
        for s in stats
    }

    result = []
    for e in events:
        stat = stats_map.get(e.id, {"total_tickets": 0, "checked_in": 0})
        result.append({
            "id": e.id,
            "title": e.title,
            "start_time": e.start_time,
            "location": e.location,
            "total_tickets": stat["total_tickets"],
            "checked_in": stat["checked_in"]
        })

    return result
@router.put("/{event_id}")
def update_event(
    event_id: int,
    data: EventCreate,
    db: Session = Depends(get_db)
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    now = datetime.now()

    if data.start_time < now:
        raise HTTPException(
            status_code=400,
            detail="Không thể sửa sự kiện về ngày trong quá khứ"
        )

    if data.end_time <= data.start_time:
        raise HTTPException(
            status_code=400,
            detail="Thời gian kết thúc phải sau thời gian bắt đầu"
        )

    event.title = data.title
    event.start_time = data.start_time
    event.end_time = data.end_time
    event.location = data.location

    db.commit()
    db.refresh(event)
    return event

