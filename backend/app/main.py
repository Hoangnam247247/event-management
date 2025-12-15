from fastapi import FastAPI
from app.database import Base, engine
from app.routers import events, registrations
from app.models.ticket import Ticket
from app.routers import tickets
from app.routers import reminders

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Event Management Platform")

app.include_router(events.router)
app.include_router(registrations.router)
app.include_router(tickets.router)
app.include_router(reminders.router)


