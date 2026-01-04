import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/adminAuthAPI';
import '../styles/global.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('bettingflash62@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await adminLogin(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', textAlign: 'center' }}>
      <h1>Admin Login</h1>
      <p style={{ color: '#FFD700' }}>BETTING FLASH ADMIN DASHBOARD</p>
      {error && <p style={{ color: '#FF3B3B' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '20px' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#00FF7F',
            color: '#0B0F14',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Logging in...' : 'Admin Login'}
        </button>
      </form>
      <p style={{ color: '#B0B0B0', fontSize: '12px', marginTop: '20px' }}>
        Email: bettingflash62@gmail.com<br />
        Phone: 07071198393
      </p>
    </div>
  );
};

export default AdminLogin;
