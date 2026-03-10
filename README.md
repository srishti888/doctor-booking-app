# doctor-booking-app

This is a simple full-stack doctor appointment booking application built using **Next.js (frontend)** and **Django (backend)**.

The project allows users to view doctors, check available slots, and book an appointment.  
The goal of this project was to connect a frontend UI with backend APIs for a basic doctor booking workflow.

---

## Tech Stack

Frontend
- Next.js
- React
- Tailwind CSS

Backend
- Django
- Django REST API

Tools
- Figma (for UI ideas and layout)

---

## Features

- View doctor details
- Fetch available appointment slots
- Book an appointment
- Simple frontend UI connected with backend APIs

---

## Figma Design

UI inspiration and layout ideas were created in Figma.

Figma link:  
https://www.figma.com/design/z6kgRDUyO3gDgZSyh32AKd/Untitled?node-id=0-1&t=o2bFqIuoiCQ0VqVS-1

---

## Project Structure

doctor-booking-app

frontend : Next.js application  
backend : Django backend API  

---

## Running the Project Locally

First clone the repository.

```
git clone <your-repo-link>
cd doctor-booking-app
```

---

## Backend Setup (Django)

Go to backend folder

```
cd backend
```

Create virtual environment

```
python -m venv venv
```

Activate virtual environment

Mac/Linux

```
source venv/bin/activate
```

Windows

```
venv\Scripts\activate
```

Install dependencies

```
pip install -r requirements.txt
```

Run migrations

```
python manage.py migrate
```

Start Django server

```
python manage.py runserver
```

Backend will run at:

```
http://127.0.0.1:8000
```

---

## Frontend Setup (Next.js)

Open a new terminal and go to frontend folder.

```
cd frontend
```

Install dependencies

```
npm install
```

Start development server

```
npm run dev
```

Frontend will run at:

```
http://localhost:3000
```

---

## Known Limitations

- The project currently focuses on basic booking functionality.
- Doctor listing UI can be improved.
- Real-time booking conflict handling is not implemented yet.

---

## Improvements With More Time

1. more features like for clarity of both patients and dr,
2. link different spcialities of drs like gynac with pediatrics etc
3. make a proper doctor listing page ui with animations
4. Deploy the project for easier accessibility

---

