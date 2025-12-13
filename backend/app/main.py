from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import event_router

app = FastAPI(title="Event Management API")

# Bật CORS cho frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # địa chỉ frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include router sự kiện
app.include_router(event_router.router)
