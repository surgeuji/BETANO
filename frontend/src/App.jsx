import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Sports from './pages/Sports';
import Casino from './pages/Casino';
import Virtual from './pages/Virtual';
import Money from './pages/Money';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/sports" element={<ProtectedRoute><Sports /></ProtectedRoute>} />
            <Route path="/casino" element={<ProtectedRoute><Casino /></ProtectedRoute>} />
            <Route path="/virtual" element={<ProtectedRoute><Virtual /></ProtectedRoute>} />
            <Route path="/money" element={<ProtectedRoute><Money /></ProtectedRoute>} />
            <Route path="/deposit" element={<ProtectedRoute><Deposit /></ProtectedRoute>} />
            <Route path="/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
