# Betting Flash - Backend

Production-grade betting platform backend. Manual settlement only, no database.

## Setup

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:
- PORT (default 5000)
- JWT_SECRET
- API_FOOTBALL_KEY
- SMTP credentials

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Wallet
- GET /api/wallet (requires auth)
- GET /api/wallet/all

### Deposits
- POST /api/deposits (requires auth)
- GET /api/deposits/:id (requires auth)
- GET /api/deposits (requires auth)

### Withdrawals
- POST /api/withdrawals (requires auth)
- GET /api/withdrawals/:id (requires auth)
- GET /api/withdrawals (requires auth)

### Sports Betting
- POST /api/bets (requires auth)
- GET /api/bets/:id (requires auth)
- GET /api/bets (requires auth)
- GET /api/bets/active/all

### Casino
- POST /api/casino (requires auth)
- GET /api/casino/:id (requires auth)
- GET /api/casino (requires auth)

### Admin (Protected)
- POST /api/admin/deposits/:id/approve
- POST /api/admin/deposits/:id/reject
- GET /api/admin/deposits
- POST /api/admin/withdrawals/:id/complete
- POST /api/admin/withdrawals/:id/reject
- GET /api/admin/withdrawals
- POST /api/admin/bets/:id/settle
- GET /api/admin/bets
- POST /api/admin/casino/:id/result
- GET /api/admin/casino
- PUT /api/admin/wallets/:userId/main-balance
- PUT /api/admin/wallets/:userId/bonus-balance

## Architecture

### No Database
- All data is in-memory
- Models define structure only
- Services hold runtime state
- Controllers are thin mapping

### Manual Settlement
- Admin approves all deposits
- Admin completes all withdrawals
- Admin settles all bets
- Admin controls casino outcomes

### Security
- JWT authentication on all protected endpoints
- Role-based admin access
- Environment variables for secrets
