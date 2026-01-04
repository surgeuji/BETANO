@echo off
REM BETTING FLASH - Quick Setup Script for Windows

echo =========================================
echo BETTING FLASH - SETUP
echo =========================================

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Node.js not found. Install it first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION% found

REM Backend
echo.
echo Setting up Backend...
cd backend
call npm install
if not exist .env copy .env.example .env
echo X Edit backend/.env with your values
cd ..

REM Frontend
echo.
echo Setting up Frontend...
cd frontend
call npm install
if not exist .env copy .env.example .env
echo X Edit frontend/.env with backend URL
cd ..

REM Admin
echo.
echo Setting up Admin Dashboard...
cd admin-dashboard
call npm install
if not exist .env copy .env.example .env
echo X Edit admin-dashboard/.env with backend URL
cd ..

echo.
echo =========================================
echo ✓ SETUP COMPLETE
echo =========================================
echo.
echo Next steps:
echo 1. Edit .env files in each folder
echo 2. PowerShell 1: cd backend; npm run dev
echo 3. PowerShell 2: cd frontend; npm run dev
echo 4. PowerShell 3: cd admin-dashboard; npm run dev
echo.
echo Access:
echo - Frontend: http://localhost:3000
echo - Admin: http://localhost:3001
echo - Backend: http://localhost:5000
echo.
pause
