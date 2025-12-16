import smtplib
import os
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

# ======================
# EMAIL ĐĂNG KÝ + QR
# ======================
def send_registration_email(
    to_email: str,
    event_title: str,
    qr_code: str,
    qr_path: str
):
    msg = EmailMessage()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to_email
    msg["Subject"] = f"Event Ticket: {event_title}"

    msg.set_content(f"""
Hello,

You have successfully registered for the event:

Event: {event_title}
Ticket code: {qr_code}

Please bring the attached QR code for check-in.

Event Management Platform
""")

    # Đính kèm ảnh QR
    with open(qr_path, "rb") as f:
        img_data = f.read()

    msg.add_attachment(
        img_data,
        maintype="image",
        subtype="png",
        filename="ticket_qr.png"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)


# ======================
# EMAIL NHẮC SỰ KIỆN
# ======================
def send_reminder_email(
    to_email: str,
    event_title: str,
    start_time: str
):
    msg = EmailMessage()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to_email
    msg["Subject"] = f"Reminder: {event_title}"

    msg.set_content(f"""
Hello,

This is a reminder for the event:

Event: {event_title}
Start time: {start_time}

Please be on time.

Event Management Platform
""")

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)
