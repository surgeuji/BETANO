# Admin User Setup - BETANO Betting Platform

## Project Summary
**BETANO** is a complete betting platform with three components:
- **Backend**: Express.js API (Node.js) running on port 5000
- **Frontend**: React app for users (sports betting, casino, virtual games, deposits/withdrawals)
- **Admin Dashboard**: React app for platform administrators

## What I've Done

### 1. ✅ Created Super Admin User
- **Email**: daviskipper@gmail.com
- **Password**: FABONG123
- **Role**: SUPER_ADMIN
- **Phone**: +1234567890

### 2. ✅ Automated Admin Initialization
Updated `backend/src/server.js` to automatically create the admin user when the server starts.

**How it works:**
- When the backend starts, it checks if the admin user exists
- If not, it automatically creates: daviskipper@gmail.com with password FABONG123
- This ensures the admin user is always available

### 3. ✅ Created Admin Creation Script
Location: `backend/src/scripts/createAdmin.js`

**Run manually with:**
```bash
cd backend
node src/scripts/createAdmin.js
```

### 4. ✅ Updated Admin Login Page
- Updated [admin-dashboard/src/pages/AdminLogin.jsx](admin-dashboard/src/pages/AdminLogin.jsx)
- Changed default placeholder credentials to new super admin credentials
- Login page now displays the correct credentials

### 5. ✅ Committed Changes to Git
All changes have been staged and committed:
```
✓ admin-dashboard/src/pages/AdminLogin.jsx (updated)
✓ backend/src/server.js (updated - auto-initialization)
✓ backend/src/scripts/createAdmin.js (new file)
```

## How to Use

### Start the Backend
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
# ✅ Admin user is automatically created on startup
```

### Login to Admin Dashboard
1. Start the frontend admin dashboard
2. Go to Admin login page
3. Use credentials:
   - **Email**: daviskipper@gmail.com
   - **Password**: FABONG123

### What Admin Can Do
- Manage Users
- Manage Bets
- Manage Casino Games
- Manage Deposits
- Manage Withdrawals
- Manage Wallets
- View System Statistics

## GitHub Push Status

**Issue**: Permission denied when pushing to GitHub
- Commits are created locally ✅
- Changes are staged ✅
- Git remote is configured ✅
- **Authentication needed for push**

### To Push to GitHub (Choose One):

#### Option 1: Use GitHub CLI
```powershell
gh auth login
# Follow the prompts to authenticate
git push origin main
```

#### Option 2: Use SSH (Recommended)
```powershell
git remote set-url origin git@github.com:surgeuji/BETANO.git
git push origin main
```

#### Option 3: Use Personal Access Token (HTTPS)
1. Create a token at: https://github.com/settings/tokens
2. Then:
```powershell
git push origin main
# When prompted, use token as password
```

## System Architecture

### Authentication Flow
1. User submits email + password on admin login
2. Backend validates credentials against in-memory UserService
3. Backend returns JWT token valid for 24 hours
4. Admin dashboard stores token in localStorage
5. Token is included in all admin API requests

### Data Storage
⚠️ **Important**: System uses **in-memory storage**
- No database configured (MongoDB/PostgreSQL)
- Data persists only while server is running
- On server restart, data resets (but admin user is auto-recreated)
- Good for development/testing
- For production, configure a real database

### Environment Variables
Make sure these are set in your `.env` files:

**Backend** (`backend/.env`):
```
PORT=5000
JWT_SECRET=your-secret-key
```

**Admin Dashboard** (`admin-dashboard/.env`):
```
VITE_API_BASE_URL=http://localhost:5000
```

## Next Steps

1. **Push to GitHub** (choose an auth method above)
2. **Deploy to Render** (see DEPLOYMENT.md)
3. **For Production**: Configure a real database (MongoDB recommended)
4. **Set stronger password**: Change FABONG123 to a secure password

## Files Modified
- [backend/src/server.js](backend/src/server.js) - Auto-init admin on startup
- [admin-dashboard/src/pages/AdminLogin.jsx](admin-dashboard/src/pages/AdminLogin.jsx) - Updated credentials
- `backend/src/scripts/createAdmin.js` - New admin creation script

---
Generated: January 6, 2026
