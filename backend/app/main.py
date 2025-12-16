from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import events, registrations, tickets, reminders
from app.models import ticket  # đảm bảo model được load

# ======================
# CREATE DB TABLES
# ======================
Base.metadata.create_all(bind=engine)

# ======================
# FASTAPI APP
# ======================
app = FastAPI(title="Event Management Platform")

# ======================
# CORS CONFIG (RẤT QUAN TRỌNG)
# ======================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================
# ROUTERS
# ======================
app.include_router(events.router)
app.include_router(registrations.router)
app.include_router(tickets.router)
app.include_router(reminders.router)



