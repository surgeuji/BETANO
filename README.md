# BETTING FLASH

Production-grade sports betting and casino platform with manual settlement and admin control.

## ⚠️ CRITICAL INFORMATION

**This is NOT a demo.** This is a real betting system with manual settlement only. Every action is deliberate. Every balance change requires admin approval.

## Architecture

Three independent applications:

- **Backend** (Express, Node.js) → Render
- **Frontend** (React, Vite) → Vercel
- **Admin Dashboard** (React, Vite) → Vercel

## Setup Instructions

### Prerequisites

- Node.js 16+
- npm 8+
- Git
- GitHub account
- Render account
- Vercel account

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your values
npm run dev  # Development
npm start    # Production
```

**Port**: 5000

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with backend URL
npm run dev  # Development
npm run build  # Production
```

**Port**: 3000 (dev), Vercel (prod)

### 3. Admin Dashboard Setup

```bash
cd admin-dashboard
npm install
cp .env.example .env
# Edit .env with backend URL
npm run dev  # Development
npm run build  # Production
```

**Port**: 3001 (dev), Vercel (prod)

## Key Rules

### NO DATABASE
- All data is in-memory
- Lost on server restart
- DB-ready architecture (for future migration)

### MANUAL SETTLEMENT ONLY
- Admin approves all deposits
- Admin completes all withdrawals
- Admin settles all bets
- Admin controls casino outcomes

### MONEY FLOW
Users cannot auto-credit or auto-debit. Only admins modify balances.

### SECURITY
- JWT authentication
- Role-based admin access
- Environment variables for secrets
- Protected API routes

## Admin Roles

- **SUPER_ADMIN**: Full access
- **FINANCE_ADMIN**: Deposits, Withdrawals, Wallets
- **OPERATIONS_ADMIN**: Bets, Casino, Virtual Games
- **SUPPORT_ADMIN**: Read-only views

## API Endpoints

### Public
- `POST /api/auth/register`
- `POST /api/auth/login`

### User (Auth Required)
- `GET /api/wallet`
- `POST /api/deposits` / `GET /api/deposits`
- `POST /api/withdrawals` / `GET /api/withdrawals`
- `POST /api/bets` / `GET /api/bets`
- `POST /api/casino` / `GET /api/casino`

### Admin (Auth + Role Required)
- `/api/admin/deposits/:id/approve`
- `/api/admin/withdrawals/:id/complete`
- `/api/admin/bets/:id/settle`
- `/api/admin/casino/:id/result`
- `/api/admin/wallets/:userId/main-balance`
- `/api/admin/wallets/:userId/bonus-balance`

## Color System (LOCKED)

```
Background:        #0B0F14
Card Background:   #151A21
Primary Action:    #00FF7F
Promo Gold:        #FFD700
Win Green:         #1AFF00
Loss Red:          #FF3B3B
Pending Blue:      #1E90FF
Primary Text:      #FFFFFF
Secondary Text:    #B0B0B0
```

## Deployment

### Order (IMPORTANT)
1. Backend → Render (first)
2. Frontend → Vercel (second)
3. Admin Dashboard → Vercel (third)

### Environment Variables

**Backend**
- `PORT`
- `JWT_SECRET`
- `API_FOOTBALL_KEY`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`

**Frontend & Admin**
- `VITE_API_BASE_URL` (backend URL)

## Contacts

- **Admin Email**: bettingflash62@gmail.com
- **Admin Phone**: 07071198393

## Philosophy

Betting Flash is a controlled betting system, not a gambling toy.

- Every action is deliberate
- Every balance change is manual
- Every admin action is logged
- Nothing happens automatically

---

**Status**: Ready for Deployment ✅
