from pydantic import BaseModel, EmailStr

class RegistrationCreate(BaseModel):
    name: str
    email: EmailStr
