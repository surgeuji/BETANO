import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../api/authAPI';
import '../styles/global.css';

const Navigation = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#151A21',
      padding: '15px 20px',
      borderBottom: '2px solid #00FF7F',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <h2 style={{ margin: 0, color: '#00FF7F' }}>BETTING FLASH</h2>
      {authenticated && (
        <div style={{ display: 'flex', gap: '15px' }}>
          <a href="/" style={{ color: '#FFFFFF' }}>Home</a>
          <a href="/sports" style={{ color: '#FFFFFF' }}>Sports</a>
          <a href="/casino" style={{ color: '#FFFFFF' }}>Casino</a>
          <a href="/virtual" style={{ color: '#FFFFFF' }}>Virtual</a>
          <a href="/money" style={{ color: '#FFFFFF' }}>Money</a>
          <button onClick={handleLogout} style={{
            backgroundColor: '#FF3B3B',
            color: '#FFFFFF',
            padding: '8px 15px',
            borderRadius: '14px',
            border: 'none',
            cursor: 'pointer',
          }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
