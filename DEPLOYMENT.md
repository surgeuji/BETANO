# Betting Flash - Deployment Guide

**FOLLOW THIS ORDER EXACTLY OR DEPLOYMENT WILL FAIL**

## Step 1: Backend Deployment (Render)

### 1.1 Prepare Backend

```bash
cd backend
npm install
# Test locally
npm run dev
# Ctrl+C to stop
```

### 1.2 Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/betting-flash-backend.git
git push -u origin main
```

### 1.3 Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New → Web Service**
3. Connect GitHub repository
4. Fill in:
   - **Name**: betting-flash-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `/backend` (if monorepo) or leave empty
5. Add Environment Variables:
   - `JWT_SECRET`: Generate a strong secret
   - `API_FOOTBALL_KEY`: 46c62fd8011b06c3f262ef46528d7ac9
   - `PORT`: 5000 (or leave empty for auto)
6. Click **Create Web Service**
7. Wait for deployment
8. Copy your backend URL: `https://your-service.onrender.com`

**SAVE THIS URL - YOU NEED IT FOR FRONTEND/ADMIN**

---

## Step 2: Frontend Deployment (Vercel)

### 2.1 Prepare Frontend

```bash
cd frontend
npm install
npm run build
# If build fails, STOP and fix errors
```

### 2.2 Update Environment

Create `.env.production`:
```
VITE_API_BASE_URL=https://your-service.onrender.com
```

### 2.3 Push to GitHub

```bash
git add .
git commit -m "Frontend ready for deployment"
git push
```

### 2.4 Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click **Add New → Project**
3. Import GitHub repository
4. Fill in:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Root Directory**: `/frontend` (if monorepo)
5. Add Environment Variables:
   - `VITE_API_BASE_URL`: Your backend URL from Step 1
6. Click **Deploy**
7. Wait for deployment
8. Get your frontend URL

---

## Step 3: Admin Dashboard Deployment (Vercel)

### 3.1 Prepare Admin

```bash
cd admin-dashboard
npm install
npm run build
# If build fails, STOP and fix errors
```

### 3.2 Update Environment

Create `.env.production`:
```
VITE_API_BASE_URL=https://your-service.onrender.com
```

### 3.3 Push to GitHub

```bash
git add .
git commit -m "Admin dashboard ready for deployment"
git push
```

### 3.4 Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Click **Add New → Project**
3. Import GitHub repository (DIFFERENT from frontend)
4. Fill in:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Root Directory**: `/admin-dashboard` (if monorepo)
5. Add Environment Variables:
   - `VITE_API_BASE_URL`: Your backend URL from Step 1
6. Click **Deploy**
7. Wait for deployment

---

## Step 4: Final Testing

### 4.1 Test Backend

```bash
curl https://your-backend.onrender.com/health
# Should return: {"status":"Server is running"}
```

### 4.2 Test Frontend

1. Visit frontend URL
2. Should redirect to register/login
3. Register a user
4. Login
5. Check if wallet loads (calls backend)

### 4.3 Test Admin

1. Visit admin URL
2. Login with admin email
3. Try to approve a deposit (if available)

---

## Common Issues

### Backend won't start
- Check logs in Render
- Verify `npm start` works locally
- Verify PORT environment variable

### Frontend shows blank page
- Check browser console for errors
- Verify `VITE_API_BASE_URL` is set
- Check if backend is live

### API 404 errors
- Backend URL mismatch
- Check frontend env variable
- Verify routes exist in backend

### CORS errors
- Backend CORS is configured
- Check origin domain in Render

---

## Production Checklist

- [ ] Backend is live (Render)
- [ ] Backend health check works
- [ ] Frontend is live (Vercel)
- [ ] Frontend can register/login
- [ ] Frontend can fetch wallet
- [ ] Admin is live (Vercel)
- [ ] Admin can login
- [ ] Admin can see deposits/bets
- [ ] No console errors
- [ ] No API 404 errors

---

## Updating Code

### Backend
```bash
cd backend
git add .
git commit -m "Update message"
git push  # Render auto-deploys
```

### Frontend
```bash
cd frontend
git add .
git commit -m "Update message"
git push  # Vercel auto-deploys
```

### Admin
```bash
cd admin-dashboard
git add .
git commit -m "Update message"
git push  # Vercel auto-deploys
```

---

## Important Notes

- **Never commit `.env`** - Use `.env.example`
- **Never hardcode secrets**
- **Free tier limits**: Render sleeps after 15 mins inactivity
- **Vercel**: 100GB bandwidth/month free
- **Backend restarts** will lose all in-memory data
- **Manual settlement only** - No auto-anything

---

**Deployment Status**: Ready ✅
