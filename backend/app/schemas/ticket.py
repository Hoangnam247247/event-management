from pydantic import BaseModel

class TicketResponse(BaseModel):
    id: int
    registration_id: int
    qr_code: str

    class Config:
        from_attributes = True
