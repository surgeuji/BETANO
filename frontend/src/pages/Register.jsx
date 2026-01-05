import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authAPI';
import '../styles/colors.css';
import '../styles/auth.css';

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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Check if promo code is entered
    if (formData.promoCode.trim()) {
      setShowPromoModal(true);
      return;
    }

    // Proceed with registration
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
          <h1 className="auth-logo">⚡ BETTING FLASH</h1>
          <p className="auth-subtitle">Join Premium Bettors Today</p>

          {error && (
            <div className="alert alert-warning">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Your Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
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
              <label>Phone Number</label>
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
              <label>Promo Code <span className="optional">(Optional)</span></label>
              <input
                type="text"
                name="promoCode"
                placeholder="Enter promo code if you have one"
                value={formData.promoCode}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary auth-btn"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-link">
            Already have an account? <a href="/login">Login Here</a>
          </div>
        </div>
      </div>

      {/* Promo Code Modal */}
      {showPromoModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🎉 Congratulations!</h2>
            <p>You qualify for a <strong>500% bonus</strong> on your first deposit.</p>
            <p style={{ marginTop: '16px' }}>Deposit now and unlock your bonus.</p>
            
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowPromoModal(false)}>
                Maybe Later
              </button>
              <button 
                className="btn-primary" 
                onClick={() => {
                  setShowPromoModal(false);
                  submitRegistration();
                }}
              >
                Continue to Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
