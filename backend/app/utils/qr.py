import qrcode
import os

QR_DIR = "qr_codes"

def generate_qr_image(qr_code: str) -> str:
    os.makedirs(QR_DIR, exist_ok=True)

    file_path = f"{QR_DIR}/{qr_code}.png"
    img = qrcode.make(qr_code)
    img.save(file_path)

    return file_path
#Ảnh lưu tại backend/qr_codes/<uuid>.png
