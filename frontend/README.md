# Betting Flash - Frontend

Mobile-first React + Vite frontend for Betting Flash betting platform.

## Setup

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env`:
```
VITE_API_BASE_URL=http://localhost:5000
```

## Development

```bash
npm run dev
```

Server will run on http://localhost:3000

## Build

```bash
npm run build
```

Output will be in `dist/` folder for deployment.

## Pages

- Register (first screen)
- Login
- Home (wallet display)
- Sports Betting (1X2, O/U, etc.)
- Casino (Spin, Crash, Dice, Slots)
- Virtual (admin-controlled games)
- Money (Deposit & Withdraw)

## Architecture

### Frontend Rules
- Never calculate balances
- Always fetch from backend
- Never fake approvals
- Reflect backend state only

### Color System
- Background: #0B0F14
- Card: #151A21
- Primary Action: #00FF7F
- Gold: #FFD700
- Win Green: #1AFF00
- Loss Red: #FF3B3B
- Pending Blue: #1E90FF
- Text: #FFFFFF
- Secondary: #B0B0B0

### Authentication
- JWT tokens stored in localStorage
- Protected routes require authentication
- Unauthorized access redirects to login
