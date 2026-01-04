import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageDeposits from './pages/ManageDeposits';
import ManageWithdrawals from './pages/ManageWithdrawals';
import ManageBets from './pages/ManageBets';
import ManageCasino from './pages/ManageCasino';
import ManageWallets from './pages/ManageWallets';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <AdminProtectedRoute>
              <div style={{ display: 'flex', minHeight: '100vh' }}>
                <AdminSidebar />
                <div style={{ flex: 1, backgroundColor: '#0B0F14' }}>
                  <Routes>
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/deposits" element={<ManageDeposits />} />
                    <Route path="/withdrawals" element={<ManageWithdrawals />} />
                    <Route path="/bets" element={<ManageBets />} />
                    <Route path="/casino" element={<ManageCasino />} />
                    <Route path="/wallets" element={<ManageWallets />} />
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
