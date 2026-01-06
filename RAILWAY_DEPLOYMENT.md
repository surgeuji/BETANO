# Railway Deployment Guide

## Deploy to Railway

### Prerequisites
- GitHub account (repository connected)
- Railway account (railway.app)

---

## Step 1: Deploy Frontend to Railway

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Select your `BETANO` repository
5. Select the `frontend` directory
6. Railway will auto-detect Vite and build

### Add Environment Variables
In Railway Project → Variables:
```
VITE_API_BASE_URL = https://betano-9i2q.onrender.com
```

### Generate Domain
- Go to **Settings → Domains**
- Click **"Generate Domain"**
- Your frontend will be live at: `https://your-generated-domain.railway.app`

---

## Step 2: Deploy Admin Dashboard to Railway

1. In the same Railway account, click **"New Project"** again
2. Select **"Deploy from GitHub repo"**
3. Select your `BETANO` repository
4. Select the `admin-dashboard` directory
5. Click **Deploy**

### Add Environment Variables
In this project's Variables:
```
VITE_API_BASE_URL = https://betano-9i2q.onrender.com
```

### Generate Domain
- Go to **Settings → Domains**
- Click **"Generate Domain"**
- Your admin dashboard will be live at: `https://your-admin-generated-domain.railway.app`

---

## Step 3: Auto-Deploy on GitHub Push

Railway automatically redeploys when you push to GitHub:
```bash
git push origin main
# Railway will automatically rebuild and deploy!
```

---

## Your Live URLs

After deployment:
- **Frontend**: `https://your-frontend-domain.railway.app`
- **Admin Dashboard**: `https://your-admin-domain.railway.app`
- **Backend** (Render): `https://betano-9i2q.onrender.com` ✅

---

## Railway Dashboard Features

✅ **Logs** - View real-time deployment logs
✅ **Metrics** - Monitor CPU, memory, bandwidth
✅ **Deployments** - History of all deployments
✅ **Rollback** - One-click revert to previous version
✅ **Environment Variables** - Easy management
✅ **Custom Domains** - Upgrade to use your own domain

---

## Update Package.json (if needed)

Make sure both projects have the build scripts:

### frontend/package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### admin-dashboard/package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## Troubleshooting

### Issue: Build fails
- Check logs in Railway → Deployment logs
- Make sure all dependencies in package.json are correct
- Run locally: `npm install && npm run build`

### Issue: Environment variables not loading
- Verify variables in Railway → Variables
- Rebuild: Railway → Deployments → Click latest → Redeploy

### Issue: Cannot connect to backend
- Double-check `VITE_API_BASE_URL` points to correct Render URL
- Ensure Render backend is running: `https://betano-9i2q.onrender.com/health`

---

## Cost

**Free Tier**: $5/month credit
- Enough for frontend + admin dashboard
- No credit card required initially

**After free tier**: ~$0.50/day per service

---

## Remove Old Netlify Files

You can now delete:
- `frontend/netlify.toml` ❌
- `admin-dashboard/netlify.toml` ❌

The `railway.json` files handle everything!

---

## Summary

| Service | URL | Status |
|---------|-----|--------|
| Frontend | Railway | 🟢 Live |
| Admin Dashboard | Railway | 🟢 Live |
| Backend | Render | 🟢 Live |

All set! Your app is production-ready! 🚀
