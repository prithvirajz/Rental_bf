# Rental BF

Full-stack rental marketplace app built with **Django REST Framework** (backend) and **Next.js** (frontend).

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS, Axios
- **Backend:** Django 5, Django REST Framework, SimpleJWT, SQLite (default), Razorpay integration

## Project Structure

```text
rental_bf/
├─ backend/     # Django + DRF API
└─ frontend/    # Next.js app
```

## Quick Start (Local)

### 1) Clone and enter project

```bash
git clone https://github.com/prithvirajz/Rental_bf.git
cd Rental_bf
```

### 2) Backend setup

```bash
cd backend
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at: `http://localhost:8000`

### 3) Frontend setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:3000`

## Environment Variables

### Backend (`backend/.env`) optional for local dev

```env
SECRET_KEY=your-secret-key
DEBUG=True

# Optional cloud storage
AZURE_ACCOUNT_NAME=
AZURE_ACCOUNT_KEY=
AZURE_CONTAINER=

# Optional payment integration
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### Frontend (`frontend/.env.local`) optional

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## API Base URL

- Base: `http://localhost:8000/api`
- Auth:
  - `POST /auth/register/`
  - `POST /auth/login/`
  - `POST /auth/refresh/`
  - `GET /auth/me/`
- Core:
  - `/boyfriends/`
  - `/bookings/`
  - `POST /verify-payment/`

## Useful Commands

### Backend

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

- Default database is SQLite (`backend/db.sqlite3`).
- Frontend Axios client defaults to `http://localhost:8000/api` if `NEXT_PUBLIC_API_URL` is not set.
