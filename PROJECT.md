# Betting Flash Project

Complete betting platform with three independent applications:
- Backend (Express)
- Frontend (React)
- Admin Dashboard (React)

## Quick Start

### 1. Install Dependencies

```bash
# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..

# Admin Dashboard
cd admin-dashboard && npm install && cd ..
```

### 2. Configure Environment

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env

# Frontend
cp frontend/.env.example frontend/.env
# Edit frontend/.env with http://localhost:5000

# Admin
cp admin-dashboard/.env.example admin-dashboard/.env
# Edit admin-dashboard/.env with http://localhost:5000
```

### 3. Start Development Servers

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

**Terminal 3 - Admin Dashboard**
```bash
cd admin-dashboard
npm run dev
# Runs on http://localhost:3001
```

## Project Structure

```
betting-flash/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
├── admin-dashboard/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
├── README.md
└── DEPLOYMENT.md
```

## Key Features

✅ Manual settlement only
✅ Admin-controlled outcomes
✅ In-memory state (DB-ready architecture)
✅ JWT authentication
✅ Role-based access control
✅ Sports betting (API-Football)
✅ Casino games
✅ Deposit/Withdrawal management
✅ Wallet management

## Technologies

- **Backend**: Express, JWT, bcryptjs, Axios
- **Frontend**: React, React Router, Vite, Axios
- **Admin**: React, React Router, Vite, Axios
- **Deployment**: Render (backend), Vercel (frontend & admin)

## Testing

### Backend
```bash
curl http://localhost:5000/health
```

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","phone":"1234567890","password":"password"}'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'
```

## Documentation

- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)
- [Admin Dashboard README](admin-dashboard/README.md)
- [Deployment Guide](DEPLOYMENT.md)

## Admin Credentials

**Email**: bettingflash62@gmail.com
**Phone**: 07071198393

## Important Rules

🚫 NO DATABASE (in-memory only)
🚫 NO AUTO-SETTLEMENT (admin only)
🚫 NO AUTO-MONEY (admin controls)
🚫 NO SECRETS IN CODE (use .env)

✅ Manual flows only
✅ Admin authority
✅ Clean architecture
✅ DB-ready design

---

**Status**: Ready for Development ✅
**Last Updated**: January 4, 2026
