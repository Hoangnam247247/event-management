from fastapi import APIRouter, HTTPException
from typing import List
from app.models import Event, EventDetail
from app.schemas import EventCreate, EventUpdate, EventOut, EventDetailCreate, EventDetailUpdate, EventDetailOut
from app.database import SessionLocal

router = APIRouter()

@router.get("/", response_model=List[EventOut])
def get_events():
    db = SessionLocal()
    events = db.query(Event).order_by(Event.priority_level, Event.position).all()
    return events

@router.post("/", response_model=EventOut)
def create_event(event: EventCreate):
    db = SessionLocal()
    new_event = Event(**event.dict())
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event

@router.put("/{event_id}", response_model=EventOut)
def update_event(event_id: int, event: EventUpdate):
    db = SessionLocal()
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    for key, value in event.dict(exclude_unset=True).items():
        setattr(db_event, key, value)
    db.commit()
    db.refresh(db_event)
    return db_event

@router.delete("/{event_id}")
def delete_event(event_id: int):
    db = SessionLocal()
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    db.delete(db_event)
    db.commit()
    return {"message": "Deleted successfully"}

# Update priority
@router.put("/priority/{event_id}")
def update_priority(event_id: int, priority_level: int, position: int):
    db = SessionLocal()
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    db_event.priority_level = priority_level
    db_event.position = position
    db.commit()
    return {"message": "Updated priority"}

# Step2: EventDetail
@router.post("/detail", response_model=EventDetailOut)
def create_event_detail(detail: EventDetailCreate):
    db = SessionLocal()
    new_detail = EventDetail(**detail.dict())
    db.add(new_detail)
    db.commit()
    db.refresh(new_detail)
    return new_detail

@router.put("/detail/{detail_id}", response_model=EventDetailOut)
def update_event_detail(detail_id: int, detail: EventDetailUpdate):
    db = SessionLocal()
    db_detail = db.query(EventDetail).filter(EventDetail.id == detail_id).first()
    if not db_detail:
        raise HTTPException(status_code=404, detail="EventDetail not found")
    for key, value in detail.dict(exclude_unset=True).items():
        setattr(db_detail, key, value)
    db.commit()
    db.refresh(db_detail)
    return db_detail
