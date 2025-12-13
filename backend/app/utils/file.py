import os
from fastapi import UploadFile
from shutil import copyfileobj

UPLOAD_DIR = "app/static/images"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def save_image(file: UploadFile):
    path = os.path.join(UPLOAD_DIR, file.filename)
    with open(path, "wb") as buffer:
        copyfileobj(file.file, buffer)
    return f"/static/images/{file.filename}"
