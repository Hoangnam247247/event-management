#!/bin/bash

echo "🚀 Generating Open-Source Event Management Structure..."

# BACKEND
mkdir -p backend/{routes,schemas,services,db/models,jobs,utils}
touch backend/main.py

# Backend Routes
touch backend/routes/{events.py,registration.py,ticket.py,rsvp.py,calendar.py,seats.py,payment.py,checkin.py,admin.py}

# Backend Schemas
touch backend/schemas/{event.py,registration.py,ticket.py,rsvp.py,seat.py,payment.py,checkin.py,admin.py}

# Backend Services
touch backend/services/{event_service.py,registration_service.py,ticket_service.py,rsvp_service.py,calendar_service.py,seat_service.py,payment_service.py,checkin_service.py,admin_service.py,reminder_service.py}

# Backend Models
touch backend/db/models/{event_model.py,attendee_model.py,ticket_model.py,seat_model.py,user_model.py}

# Backend Jobs
touch backend/jobs/{reminder_worker.py}

# Backend Utils
touch backend/utils/{email_sender.py,qr_generator.py,ics_writer.py}

# FRONTEND
mkdir -p frontend/{pages/events,pages/admin,pages/ticket,pages/seats,pages/api,components,hooks,utils,styles,config}

# Pages
touch frontend/pages/index.jsx
touch frontend/pages/register.jsx
touch frontend/pages/payment.jsx

# Event pages
touch frontend/pages/events/{index.jsx,[id].jsx}

# Ticket pages
touch frontend/pages/ticket/{[id].jsx}

# Seat pages
touch frontend/pages/seats/{[eventId].jsx}

# Admin pages
touch frontend/pages/admin/{dashboard.jsx,checkin.jsx}

# Components
touch frontend/components/{EventCard.jsx,EventForm.jsx,RegisterForm.jsx,SeatMap.jsx,PaymentForm.jsx,TicketCard.jsx,StatsCard.jsx,AdminEventTable.jsx,AdminAttendeeTable.jsx,QrScanner.jsx,AddCalendarButton.jsx}

# Hooks
touch frontend/hooks/{useSeatSelection.js,useFetch.js}

# Utils
touch frontend/utils/{api.js,validateEmail.js}

# Styles + Config
touch frontend/styles/global.css
touch frontend/config/config.js

echo "🎉 All files generated successfully!"
