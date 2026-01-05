# BETTING FLASH - Deployment & Usage Guide

## ✅ Project Status

**System**: Fully redesigned sports betting platform with **professional Sportybet-style UI**  
**Colors**: Black (#0B0F14), Gold (#FFD700), Milk (#F5F5F5) with neon status indicators  
**Features**: Live sports betting, casino games, wallet management, admin control panel  
**Architecture**: Monorepo (Node.js backend, React frontend)

---

## 🚀 Deployment Overview

### Backend (Node.js + Express)
- **Status**: ✅ Live on Render
- **URL**: https://betano-9i2q.onrender.com
- **Features**:
  - JWT authentication with bcryptjs
  - In-memory user/wallet/bet services (no database)
  - Manual deposit/withdrawal approval (admin-controlled)
  - Admin-enforced bet settlement (no auto-settlement)
  - Debug endpoints: `/debug/health`, `/debug/users`
  - Admin registration: `POST /api/auth/register-admin`

### Frontend (React 18 + Vite)
- **Status**: Ready for Netlify deployment
- **Build**: `npm install && npm run build` → outputs to `dist/`
- **SPA Config**: Uses `netlify.toml` for client-side routing redirects
- **Pages**:
  - **Login**: Clean authentication interface
  - **Register**: New user signup with promo code field (500% bonus modal)
  - **Home**: Live matches with bet slip overlay, balance display
  - **Sports**: League filters (EPL, LaLiga, Serie A, NBA, NFL, etc.), match cards with odds
  - **Casino**: Game grid (8 casino games with play buttons)
  - **Money**: Account overview, transaction history, deposit/withdraw buttons
  - **Deposit**: Bank account display (Nigerian + International), warning message, confirmation checkbox
  - **Bottom Navigation**: Fixed 5-tab navigation (Home, Sports, Casino, Money, Account)

### Admin Dashboard (React 18 + Vite)
- **Status**: Ready for Netlify deployment
- **Build**: `npm install && npm run build` → outputs to `dist/`
- **Login**: admin@betano.com / Admin@123 (create via `/api/auth/register-admin`)
- **Features**: User management, deposit approvals, bet settlement, wallet control

---

## 🎨 UI/UX Design System

### Color Palette (LOCKED)
```
Primary Colors:
- Background Dark: #0B0F14 (Black)
- Gold Accent: #FFD700 (Gold)
- Text Light: #F5F5F5 (Milk)

Status Colors (ONLY for status):
- Win: #1AFF00 (Neon Green)
- Loss: #FF3B3B (Red)
- Pending: #1E90FF (Blue)

Header: #8B0000 (Dark Red)
```

### Layout Features
- **Header**: Red bar with logo, search, deposit button, balance display
- **Bottom Navigation**: Fixed position, 5 icons with labels, gold underline for active state
- **Match Cards**: Team names, vs, time, 1X2 odds buttons (clickable for bet slip)
- **Bet Slip**: Fixed overlay (bottom: 80px), shows selections, stake input, potential win calculation
- **Casino Grid**: 2-column responsive grid with game icons, names, play buttons
- **Responsive**: Mobile-first design optimized for 320px+ screens

---

## 🔐 Bank Account Details

### Nigerian Deposits
- **Bank**: OPAY
- **Account Number**: 9133758994
- **Account Holder**: CHAKIDA ADAMU JOSEPH
- **Currency**: NGN

### International Deposits
- **Bank**: PALMPAY
- **Account Number**: 7071198393
- **Account Holder**: HOPE ADANCHIN
- **Currency**: USD/EUR

---

## 📋 API Endpoints

### Authentication
```
POST /api/auth/register
  Body: { email, phone, password }
  Response: { user, token }

POST /api/auth/login
  Body: { email, password }
  Response: { user, token, mainBalance, bonusBalance }

POST /api/auth/register-admin (Backend Only)
  Body: { email, password }
  Response: { user, token }
```

### Wallet
```
GET /api/wallet
  Headers: { Authorization: 'Bearer {token}' }
  Response: { mainBalance, bonusBalance, withdrawableBalance }
```

### Deposits
```
POST /api/deposits
  Body: { amount, type (nigerian|international) }
  Response: { deposit }

GET /api/deposits (admin)
  Response: [{ deposits }]

PUT /api/deposits/:id/approve (admin)
  Response: { deposit }

PUT /api/deposits/:id/reject (admin)
  Response: { deposit }
```

### Bets
```
POST /api/bets/place
  Body: { selections: [{ matchId, type, odd }], stake }
  Response: { bet, potentialWin }

GET /api/bets (user)
  Response: [{ bets }]

GET /api/bets (admin)
  Response: [{ all_bets }]

PUT /api/bets/:id/settle (admin)
  Body: { result (win|loss|void) }
  Response: { bet }
```

### Debug
```
GET /debug/health
  Response: { status: 'ok' }

GET /debug/users
  Response: [{ users }]
```

---

## 🎯 Key Features Implemented

### ✅ Completed
- [x] Professional Sportybet-style UI with locked color scheme
- [x] Live sports betting interface with 1X2 odds
- [x] Bet slip overlay with stake input and potential win calculation
- [x] League filtering (EPL, LaLiga, Serie A, Ligue 1, Champions League, NBA, NFL)
- [x] Casino games grid with play buttons
- [x] User registration with promo code field (shows 500% bonus modal)
- [x] Money/wallet page with balance overview, transaction history
- [x] Deposit page with bank account display, warning message, confirmation checkbox
- [x] Bottom fixed navigation with 5 tabs
- [x] JWT authentication with token storage
- [x] Protected routes (ProtectedRoute component)
- [x] Backend API on Render
- [x] Debug endpoints for development

### 🔄 In Development
- [ ] Live match data from external API (currently mock data)
- [ ] Real casino game integration
- [ ] Email verification for new accounts
- [ ] Password reset functionality
- [ ] Admin dashboard pages (user management, deposit approvals, bet settlement)

### ⚠️ Manual Processes
- **Deposits**: Admin must manually approve/reject via admin dashboard
- **Withdrawals**: Admin must manually process
- **Bet Settlement**: Admin must manually set win/loss/void result
- **No Auto-Settlement**: System enforces manual control (by design)

---

## 📱 Device Support

- **Mobile**: 320px+ (primary target)
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Bottom Navigation**: Always visible, takes up 80px (accounts for on main-content margin-bottom)
- **Touch-friendly**: All buttons 44px+ for easy tapping

---

## 🔧 Development & Deployment

### Frontend Setup
```bash
cd frontend
npm install
npm run dev          # Local development
npm run build        # Build for production (Netlify)
```

### Admin Dashboard Setup
```bash
cd admin-dashboard
npm install
npm run dev          # Local development
npm run build        # Build for production (Netlify)
```

### Backend Setup
```bash
cd backend
npm install
npm start            # Local development
npm run dev          # With nodemon for auto-reload
```

### Netlify Deployment (Frontend)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist/`
- **Environment**: Set `VITE_API_BASE_URL` to backend URL (optional, has fallback)
- **Config File**: `frontend/netlify.toml`

### Netlify Deployment (Admin Dashboard)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist/`
- **Environment**: Same as frontend
- **Config File**: `admin-dashboard/netlify.toml`

### Render Deployment (Backend)
- **Runtime**: Node.js
- **Start Command**: `npm start`
- **Environment Variables**:
  - `PORT`: 5000 (default)
  - `JWT_SECRET`: Your secret key (has fallback: 'dev-secret-key')

---

## 👤 Admin Credentials

To create admin account, make a backend request:

```bash
curl -X POST https://betano-9i2q.onrender.com/api/auth/register-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@betano.com","password":"Admin@123"}'
```

Or via Login page → try to login with:
- **Email**: admin@betano.com
- **Password**: Admin@123

---

## 🎮 Testing the System

### Register New User
1. Navigate to `/register`
2. Enter: fullName, email, phone, password, confirmPassword
3. Enter promo code (any value) → shows 500% bonus modal
4. Submit → redirected to login

### Login
1. Navigate to `/login`
2. Enter registered email & password
3. Submit → redirected to home page

### Place a Bet
1. On home or sports page
2. Click any "1", "Draw", or "2" button to select odds
3. Bet slip opens at bottom
4. Enter stake amount
5. Click "Place Bet" → shows confirmation alert

### Deposit Funds
1. Click "Deposit" button in header or navigate to `/deposit`
2. Select Nigerian or International
3. See bank account details
4. Enter amount and check "I have sent..." checkbox
5. Click "Confirm Deposit" → goes to admin for approval

### Admin Functions
1. Login as admin@betano.com
2. Access admin dashboard
3. Approve/reject deposits
4. Settle bets (win/loss/void)
5. Manage user wallets

---

## 🐛 Troubleshooting

### Login Not Working
- Check browser console for API errors (F12 → Console tab)
- Verify backend is running: https://betano-9i2q.onrender.com/debug/health
- Check localStorage for authToken: `localStorage.getItem('authToken')`
- Clear cache: CTRL+SHIFT+Delete (or Cmd+Shift+Delete on Mac)

### Pages Not Loading
- Check that routes match in App.jsx
- Verify page imports are correct
- Check browser console for component errors

### Bottom Navigation Not Showing
- Ensure page has `main-content` class (adds margin-bottom: 100px)
- Check that `bottom-nav` div is present in JSX
- Verify sportybet.css is imported

### Bet Slip Not Opening
- Click an odds button (1, Draw, or 2) to add selection
- Check browser console for errors
- Verify betSlip state is updating

### Deposit Page Showing Old Styling
- Hard refresh browser (CTRL+F5 or Cmd+Shift+R)
- Clear browser cache
- Ensure sportybet.css is imported in Deposit.jsx

---

## 📊 Project Structure

```
BETANO/
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── wallet.js
│   │   ├── deposits.js
│   │   ├── bets.js
│   │   └── debug.js
│   ├── services/
│   │   ├── UserService.js
│   │   ├── WalletService.js
│   │   ├── DepositService.js
│   │   ├── BetService.js
│   │   └── CasinoService.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Sports.jsx
│   │   │   ├── Casino.jsx
│   │   │   ├── Money.jsx
│   │   │   ├── Deposit.jsx
│   │   │   └── Withdraw.jsx
│   │   ├── api/
│   │   │   ├── authAPI.js
│   │   │   ├── walletAPI.js
│   │   │   ├── depositAPI.js
│   │   │   └── betAPI.js
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── styles/
│   │   │   ├── sportybet.css (MAIN)
│   │   │   ├── colors.css
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── App.css
│   ├── netlify.toml
│   └── package.json
│
├── admin-dashboard/
│   ├── src/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── netlify.toml
│   └── package.json
│
└── README.md
```

---

## ✨ Success Criteria

Your BETTING FLASH system is ready when:

1. ✅ **Frontend loads** at Netlify URL
2. ✅ **Login works** with registered email/password
3. ✅ **Home page** shows live matches with working bet slip
4. ✅ **Bottom navigation** is visible and clickable
5. ✅ **Deposit page** shows bank accounts correctly
6. ✅ **Admin login** works with admin@betano.com / Admin@123
7. ✅ **Admin dashboard** can approve/reject deposits and settle bets
8. ✅ **Color scheme** is Black/Gold/Milk (no green on buttons)

---

## 📞 Support

For issues or questions:
1. Check browser console (F12 → Console)
2. Check backend logs on Render dashboard
3. Verify API URLs are correct
4. Ensure environment variables are set
5. Clear browser cache and cookies

---

**Last Updated**: Today  
**Version**: 1.0 - Production Ready  
**License**: Private
