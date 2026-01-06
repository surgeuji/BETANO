import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import ManageOpenBets from './pages/ManageOpenBets';
import ManageDeposits from './pages/ManageDeposits';
import ManageWithdrawals from './pages/ManageWithdrawals';
import ManageBets from './pages/ManageBets';
import ManageCasino from './pages/ManageCasino';
import ManageWallets from './pages/ManageWallets';
import ManageVirtualGames from './pages/ManageVirtualGames';
import ManageCasinoGames from './pages/ManageCasinoGames';
import ManageBookingCodes from './pages/ManageBookingCodes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <div style={{ display: 'flex', minHeight: '100vh' }}>
                <AdminSidebar />
                <div style={{ flex: 1, backgroundColor: '#0B0F14', overflowY: 'auto' }}>
                  <Routes>
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/users" element={<ManageUsers />} />
                    <Route path="/open-bets" element={<ManageOpenBets />} />
                    <Route path="/settled-bets" element={<ManageBets />} />
                    <Route path="/virtual-games" element={<ManageVirtualGames />} />
                    <Route path="/casino-games" element={<ManageCasinoGames />} />
                    <Route path="/wallets" element={<ManageWallets />} />
                    <Route path="/deposits" element={<ManageDeposits />} />
                    <Route path="/withdrawals" element={<ManageWithdrawals />} />
                    <Route path="/booking-codes" element={<ManageBookingCodes />} />
                    <Route path="/transactions" element={<div style={{padding: '20px'}}><h2>📋 Transaction Logs</h2><p>Coming soon...</p></div>} />
                  </Routes>
                </div>
              </div>
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
