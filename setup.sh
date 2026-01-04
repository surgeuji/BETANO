#!/bin/bash
# BETTING FLASH - Quick Setup Script

echo "========================================="
echo "BETTING FLASH - SETUP"
echo "========================================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install it first."
    exit 1
fi

echo "✅ Node.js $(node --version) found"

# Backend
echo ""
echo "Setting up Backend..."
cd backend
npm install
cp .env.example .env
echo "⚠️  Edit backend/.env with your values"
cd ..

# Frontend
echo ""
echo "Setting up Frontend..."
cd frontend
npm install
cp .env.example .env
echo "⚠️  Edit frontend/.env with backend URL"
cd ..

# Admin
echo ""
echo "Setting up Admin Dashboard..."
cd admin-dashboard
npm install
cp .env.example .env
echo "⚠️  Edit admin-dashboard/.env with backend URL"
cd ..

echo ""
echo "========================================="
echo "✅ SETUP COMPLETE"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Edit .env files in each folder"
echo "2. Terminal 1: cd backend && npm run dev"
echo "3. Terminal 2: cd frontend && npm run dev"
echo "4. Terminal 3: cd admin-dashboard && npm run dev"
echo ""
echo "Access:"
echo "- Frontend: http://localhost:3000"
echo "- Admin: http://localhost:3001"
echo "- Backend: http://localhost:5000"
echo ""
