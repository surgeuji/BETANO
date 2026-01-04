# BETTING FLASH - PRE-DEPLOYMENT CHECKLIST

## ✅ Project Creation Complete

- [x] Backend fully implemented (Express)
- [x] Frontend fully implemented (React + Vite)
- [x] Admin Dashboard fully implemented (React + Vite)
- [x] All dependencies configured
- [x] Environment templates created
- [x] Documentation complete
- [x] No database integration
- [x] Manual settlement enforced
- [x] Security implemented

---

## LOCAL SETUP (Do This First)

### Windows Users
```powershell
cd c:\Users\dedan\Pictures\BETTINGFLASH
.\setup.bat
```

### Mac/Linux Users
```bash
cd ~/BETTINGFLASH
chmod +x setup.sh
./setup.sh
```

### Manual Setup
```bash
# Backend
cd backend
npm install
cp .env.example .env
# Edit .env

# Frontend
cd frontend
npm install
cp .env.example .env
# Edit .env

# Admin
cd admin-dashboard
npm install
cp .env.example .env
# Edit .env
```

---

## LOCAL TESTING

### Start All Services

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
# Should start on http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
# Should start on http://localhost:3000
```

**Terminal 3 - Admin**
```bash
cd admin-dashboard
npm run dev
# Should start on http://localhost:3001
```

### Test Backend
```bash
curl http://localhost:5000/health
# Response: {"status":"Server is running"}
```

### Test Frontend
1. Open http://localhost:3000
2. Should show register page
3. Register test user
4. Login with test user
5. Should show wallet

### Test Admin
1. Open http://localhost:3001/admin/login
2. Email: bettingflash62@gmail.com
3. Try any password (will fail if you don't have real user)
4. Should see admin login page

---

## BEFORE DEPLOYMENT

### Code Review
- [ ] No TODO comments remaining
- [ ] No console.log in production code
- [ ] No hardcoded secrets
- [ ] All imports working
- [ ] No broken links

### Build Test
```bash
cd backend
npm install
npm start
# Ctrl+C after starting

cd frontend
npm install
npm run build
# Check dist/ folder created

cd admin-dashboard
npm install
npm run build
# Check dist/ folder created
```

### Environment Files
- [ ] backend/.env.example exists
- [ ] frontend/.env.example exists
- [ ] admin-dashboard/.env.example exists
- [ ] None of these are committed to git

### Git Setup
```bash
# Initialize git (if not already done)
git init

# Check gitignore
cat .gitignore

# Make first commit
git add .
git commit -m "Initial Betting Flash setup"
```

---

## DEPLOYMENT CHECKLIST

### Prerequisites
- [ ] GitHub account created
- [ ] GitHub CLI installed (optional)
- [ ] Render account created
- [ ] Vercel account created
- [ ] All accounts logged in

### Create Repositories

**Option 1: Three Separate Repos** (RECOMMENDED)
- [ ] betting-flash-backend
- [ ] betting-flash-frontend
- [ ] betting-flash-admin

**Option 2: One Monorepo**
- [ ] betting-flash (with /backend, /frontend, /admin-dashboard)

### Step 1: Deploy Backend (Render)

- [ ] Push backend to GitHub
- [ ] Create Render Web Service
- [ ] Select Node.js environment
- [ ] Build command: `npm install`
- [ ] Start command: `npm start`
- [ ] Add environment variables:
  - [ ] JWT_SECRET (generate random: 32+ chars)
  - [ ] API_FOOTBALL_KEY (use provided one)
  - [ ] PORT=5000
  - [ ] SMTP_* (optional for now)
- [ ] Wait for "Live" status
- [ ] Test `/health` endpoint
- [ ] **SAVE BACKEND URL** (looks like: https://your-service.onrender.com)

### Step 2: Deploy Frontend (Vercel)

- [ ] Update frontend/.env with backend URL
- [ ] Verify `npm run build` works locally
- [ ] Push frontend to GitHub
- [ ] Import project on Vercel
- [ ] Framework: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Add environment variables:
  - [ ] VITE_API_BASE_URL (your backend URL)
- [ ] Deploy
- [ ] Test registration/login

### Step 3: Deploy Admin (Vercel)

- [ ] Update admin/.env with backend URL
- [ ] Verify `npm run build` works locally
- [ ] Push admin to GitHub (DIFFERENT from frontend)
- [ ] Import project on Vercel
- [ ] Framework: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Add environment variables:
  - [ ] VITE_API_BASE_URL (your backend URL)
- [ ] Deploy
- [ ] Test admin login

### Final Verification

- [ ] Backend is live and responding
- [ ] Frontend loads and shows register page
- [ ] Admin loads and shows login page
- [ ] Frontend can register user
- [ ] Frontend can login
- [ ] Frontend can view wallet (calls backend)
- [ ] Admin can see login form
- [ ] No CORS errors in console
- [ ] No 404 errors
- [ ] Database NOT created
- [ ] Manual settlement logic intact

---

## COMMON ISSUES & FIXES

### "npm: command not found"
- Install Node.js from nodejs.org
- Restart terminal/PowerShell

### "ENOENT: no such file or directory"
- Make sure you're in correct directory
- Check path spelling

### "Port 5000 already in use"
- Kill the process or change PORT in .env

### "Cannot find module"
- Run `npm install` in that folder
- Delete node_modules and reinstall

### "Blank page on frontend"
- Check browser console for errors
- Verify VITE_API_BASE_URL in .env
- Verify backend is running

### "API returns 404"
- Check backend is running
- Verify backend URL is correct in frontend

### "Admin login not working"
- Backend must have admin user registered
- Use bettingflash62@gmail.com
- Password must match backend (manual setup needed)

---

## IMPORTANT REMINDERS

⚠️ **CRITICAL**
- Never commit .env files
- Never hardcode secrets
- Deploy backend FIRST
- Wait for backend to be live before frontend
- Use environment variables for all secrets
- Test locally before deploying

🚫 **DON'T DO THIS**
- Add MongoDB/MySQL
- Use localStorage as database
- Auto-settle bets
- Auto-credit money
- Merge apps together
- Disable admin checks
- Hardcode URLs

✅ **DO THIS**
- Keep apps separate
- Manual settlement only
- Environment-based config
- Follow deployment order
- Test each step
- Keep admin control

---

## AFTER DEPLOYMENT

### Monitor
- [ ] Check backend logs daily
- [ ] Monitor Render dashboard
- [ ] Monitor Vercel analytics
- [ ] Check for errors in console

### Backup
- [ ] Save GitHub repository URLs
- [ ] Save Render & Vercel URLs
- [ ] Keep .env files safe (NOT in git)
- [ ] Document any custom setup

### Updates
```bash
# Backend
git add .
git commit -m "Update message"
git push
# Render auto-deploys

# Frontend
git add .
git commit -m "Update message"
git push
# Vercel auto-deploys

# Admin
git add .
git commit -m "Update message"
git push
# Vercel auto-deploys
```

---

## SUPPORT

### Documentation
- README.md - Project overview
- DEPLOYMENT.md - Detailed deployment guide
- SETUP_COMPLETE.md - What was created
- PROJECT.md - Quick reference

### Per-App Docs
- backend/README.md - API endpoints
- frontend/README.md - User interface
- admin-dashboard/README.md - Admin controls

### Quick Links
- [Render Dashboard](https://dashboard.render.com)
- [Vercel Dashboard](https://vercel.com)
- [GitHub](https://github.com)
- [API Football Docs](https://www.api-football.com/documentation)

---

## DEPLOYMENT TIMELINE

**Stage 1: Local Setup** (30 mins)
- Run setup script
- Edit .env files
- Test all three servers

**Stage 2: Code Cleanup** (15 mins)
- Remove console.logs
- Verify no TODO comments
- Test local build

**Stage 3: GitHub Setup** (30 mins)
- Create repositories
- Push code
- Verify repos

**Stage 4: Backend Deploy** (10 mins)
- Create Render service
- Set environment variables
- Wait for live status

**Stage 5: Frontend Deploy** (10 mins)
- Update backend URL
- Deploy to Vercel
- Test registration

**Stage 6: Admin Deploy** (10 mins)
- Update backend URL
- Deploy to Vercel
- Test admin login

**Total Time**: ~2 hours for complete deployment

---

## FINAL SIGN-OFF

When you see all these checkboxes completed, you're ready:

- [x] All code created
- [x] No database
- [x] Manual settlement enforced
- [x] Admin controls intact
- [x] Security configured
- [ ] Local setup complete
- [ ] Local testing passed
- [ ] GitHub repositories created
- [ ] Backend deployed & live
- [ ] Frontend deployed & working
- [ ] Admin dashboard deployed & working
- [ ] Full end-to-end testing passed

**Once all are checked, you have a LIVE BETTING FLASH PLATFORM** 🚀

---

**Document Created**: January 4, 2026  
**Status**: Ready to Deploy ✅  
**Next**: Follow DEPLOYMENT.md step by step
