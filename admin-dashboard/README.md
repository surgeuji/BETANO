# Betting Flash - Admin Dashboard

Role-based React + Vite admin dashboard for Betting Flash betting platform.

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

Server will run on http://localhost:3001

## Build

```bash
npm run build
```

Output will be in `dist/` folder for deployment.

## Admin Roles & Permissions

### SUPER_ADMIN
- Access everything
- Manage deposits & withdrawals
- Settle bets
- Manage casino
- Manage wallets

### FINANCE_ADMIN
- Only access: Deposits, Withdrawals, Wallets
- Cannot see: Bets, Casino pages

### OPERATIONS_ADMIN
- Only access: Settle Bets, Manage Casino
- Cannot see: Deposits, Withdrawals, Wallets pages

### SUPPORT_ADMIN
- Read-only views
- No action buttons
- Cannot see any management pages

## Default Admin Credentials

- **Email**: bettingflash62@gmail.com
- **Phone**: 07071198393

## Architecture

### Role-Based Visibility
- Pages hidden completely based on role
- No disabled buttons
- Sidebar items only show accessible pages
- Backend enforces permissions

### Features

**Deposits Management**
- View pending deposits
- Approve deposits (add to user wallet)
- Reject deposits

**Withdrawals Management**
- View pending withdrawals
- Complete withdrawals (external payment)
- Reject withdrawals

**Bet Settlement**
- View all active bets
- Mark as Won/Lost
- Set winnings amount

**Casino Management**
- View active games
- Set game outcomes
- Assign payouts

**Wallet Management**
- Update main balance
- Update bonus balance
- Manual balance adjustments

## Color System
Same as frontend:
- Background: #0B0F14
- Card: #151A21
- Primary Action: #00FF7F
- Gold: #FFD700
- Win Green: #1AFF00
- Loss Red: #FF3B3B
- Pending Blue: #1E90FF
