import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import SportsBetting from './pages/SportsBetting';
import Casino from './pages/Casino';
import Virtual from './pages/Virtual';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/sports" element={<ProtectedRoute><SportsBetting /></ProtectedRoute>} />
            <Route path="/casino" element={<ProtectedRoute><Casino /></ProtectedRoute>} />
            <Route path="/virtual" element={<ProtectedRoute><Virtual /></ProtectedRoute>} />
            <Route path="/money" element={<ProtectedRoute><div style={{ padding: '20px' }}><h1>Money</h1><div style={{ display: 'flex', gap: '20px' }}><a href="/deposit" style={{ backgroundColor: '#00FF7F', color: '#0B0F14', padding: '15px 30px', borderRadius: '14px', fontWeight: 'bold', textDecoration: 'none' }}>Deposit</a><a href="/withdraw" style={{ backgroundColor: '#1E90FF', color: '#FFFFFF', padding: '15px 30px', borderRadius: '14px', fontWeight: 'bold', textDecoration: 'none' }}>Withdraw</a></div></div></ProtectedRoute>} />
            <Route path="/deposit" element={<ProtectedRoute><Deposit /></ProtectedRoute>} />
            <Route path="/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
