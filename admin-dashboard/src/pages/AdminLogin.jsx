import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/adminAuthAPI';
import '../styles/admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('daviskipper@gmail.com');
  const [password, setPassword] = useState('FABONG123');
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
      setError(err.response?.data?.error || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1>⚡ BETANO</h1>
        <p>Admin Control Panel</p>

        {error && (
          <div className="admin-alert admin-alert-error">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="admin-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="admin@betano.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="admin-submit-btn"
          >
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>

        <div style={{ marginTop: 30, padding: 20, background: 'rgba(255, 215, 0, 0.1)', borderRadius: 10, border: '1px solid rgba(255, 215, 0, 0.3)' }}>
          <p style={{ color: '#ffd700', margin: '0 0 10px', fontWeight: 700 }}>Super Admin Credentials:</p>
          <p style={{ color: '#b0b0b0', margin: 5, fontSize: 13 }}>Email: daviskipper@gmail.com</p>
          <p style={{ color: '#b0b0b0', margin: 5, fontSize: 13 }}>Password: FABONG123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
