from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.event import EventCreate, EventUpdate, EventOut
from app.services import event_service
from app.database import get_db

router = APIRouter(prefix="/events", tags=["events"])

@router.post("/", response_model=EventOut)
def create_event(event: EventCreate, db: Session = Depends(get_db)):
    return event_service.create_event(db, event)

@router.get("/", response_model=list[EventOut])
def list_events(skip: int = 0, limit: int = 10, search: str = "", db: Session = Depends(get_db)):
    return event_service.get_events(db, skip, limit, search)

@router.get("/{event_id}", response_model=EventOut)
def get_event(event_id: int, db: Session = Depends(get_db)):
    db_event = event_service.get_event(db, event_id)
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

@router.put("/{event_id}", response_model=EventOut)
def update_event(event_id: int, event: EventUpdate, db: Session = Depends(get_db)):
    db_event = event_service.update_event(db, event_id, event)
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

@router.delete("/{event_id}", response_model=EventOut)
def delete_event(event_id: int, db: Session = Depends(get_db)):
    db_event = event_service.delete_event(db, event_id)
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event
