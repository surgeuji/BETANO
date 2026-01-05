import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authAPI';
import '../styles/sportybet.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    promoCode: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.promoCode.trim()) {
      setShowPromoModal(true);
      return;
    }

    await submitRegistration();
  };

  const submitRegistration = async () => {
    setLoading(true);

    try {
      await register(formData.email, formData.phone, formData.password);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-card">
          <h1>⚡ BETTING FLASH</h1>
          <p>Create Your Account</p>

          {error && (
            <div className="alert alert-error">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Your name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="+234 (8XX) XXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Promo Code <span style={{ color: 'var(--color-muted)', fontSize: '12px' }}>(Optional)</span></label>
              <input
                type="text"
                name="promoCode"
                placeholder="If you have one"
                value={formData.promoCode}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-login"
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>

      {showPromoModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '16px',
            padding: '40px 30px',
            maxWidth: '420px',
            width: '90%',
            textAlign: 'center'
          }}>
            <h2 style={{ color: 'var(--color-gold)', marginBottom: '12px' }}>🎉 Congratulations!</h2>
            <p style={{ color: 'var(--color-muted)', marginBottom: '16px' }}>
              You qualify for a <strong style={{ color: 'var(--color-gold)' }}>500% bonus</strong> on your first deposit.
            </p>
            <p style={{ color: 'var(--color-muted)', marginBottom: '24px' }}>
              Deposit now and unlock your bonus.
            </p>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setShowPromoModal(false)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  color: 'var(--color-milk)',
                  padding: '12px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Maybe Later
              </button>
              <button 
                onClick={() => {
                  setShowPromoModal(false);
                  submitRegistration();
                }}
                className="btn-login"
                style={{ flex: 1 }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
