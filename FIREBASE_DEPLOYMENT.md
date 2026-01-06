# Firebase Hosting Deployment Guide

## Deploy Frontend & Admin Dashboard to Firebase

### Prerequisites
- Google account
- Firebase CLI installed

---

## Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

---

## Step 2: Login to Firebase

```bash
firebase login
```

Browser will open → Sign in with Google account

---

## Step 3: Build Both Apps Locally

### Frontend
```bash
cd frontend
npm run build
```

### Admin Dashboard
```bash
cd admin-dashboard
npm run build
```

---

## Step 4: Deploy to Firebase

### Deploy Frontend
```bash
cd frontend
firebase deploy --project betano-frontend
```

### Deploy Admin Dashboard
```bash
cd admin-dashboard
firebase deploy --project betano-admin
```

---

## Step 5: Set Environment Variables

For both projects, add `.env.production`:

### frontend/.env.production
```
VITE_API_BASE_URL=https://betano-9i2q.onrender.com
```

### admin-dashboard/.env.production
```
VITE_API_BASE_URL=https://betano-9i2q.onrender.com
```

Then rebuild and deploy:
```bash
npm run build
firebase deploy
```

---

## Your Live URLs

After deployment:
- **Frontend**: `https://betano-frontend.web.app`
- **Admin Dashboard**: `https://betano-admin.web.app`
- **Backend** (Render): `https://betano-9i2q.onrender.com` ✅

---

## Firebase Console Features

✅ **Hosting Tab** - View deployments, rollback, analytics
✅ **Environment Variables** - Manage .env files
✅ **Auto-HTTPS** - SSL certificate automatically
✅ **Global CDN** - Lightning fast worldwide
✅ **Analytics** - Track visits, performance

---

## Auto-Deploy on GitHub (Optional)

Use GitHub Actions to auto-deploy on every push:

Create `.github/workflows/firebase-deploy.yml`:

```yaml
name: Firebase Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: cd frontend && npm ci && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: betano-frontend

  deploy-admin:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: cd admin-dashboard && npm ci && npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: betano-admin
```

---

## Summary

| Service | URL | Status |
|---------|-----|--------|
| Frontend | Firebase | 🟢 Live |
| Admin Dashboard | Firebase | 🟢 Live |
| Backend | Render | 🟢 Live |

All set! Production-ready! 🚀

---

## Troubleshooting

### Issue: "Project not found"
- Run: `firebase projects:list`
- Update project IDs in firebase.json

### Issue: Environment variables not loading
- Add to `.env.production`
- Rebuild: `npm run build`
- Redeploy: `firebase deploy`

### Issue: API calls failing
- Verify VITE_API_BASE_URL is correct
- Check Render backend is running: `https://betano-9i2q.onrender.com/health`
