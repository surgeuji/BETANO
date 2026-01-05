import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDeposit } from '../api/depositAPI';
import '../styles/sportybet.css';

const Deposit = () => {
  const navigate = useNavigate();
  const [depositType, setDepositType] = useState('nigerian'); // nigerian | international
  const [amount, setAmount] = useState('');
  const [hasDeposited, setHasDeposited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Bank Account Details
  const accounts = {
    nigerian: {
      bankName: 'OPAY',
      accountNumber: '9133758994',
      accountHolder: 'CHAKIDA ADAMU JOSEPH',
      currency: 'NGN'
    },
    international: {
      bankName: 'PALMPAY',
      accountNumber: '7071198393',
      accountHolder: 'HOPE ADANCHIN',
      currency: 'USD/EUR'
    }
  };

  const currentAccount = accounts[depositType];

  const handleConfirmDeposit = async (e) => {
    e.preventDefault();
    
    if (!hasDeposited) {
      setError('Please confirm that you have sent the money before proceeding.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await createDeposit(parseFloat(amount), depositType);
      setMessage('✓ Deposit confirmed. Admin will verify and credit your account.');
      setAmount('');
      setHasDeposited(false);
      setTimeout(() => {
        setMessage('');
        navigate('/money');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Deposit confirmation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="header">
        <div className="header-logo">⚡ BETTING FLASH</div>
        <div className="header-actions">
          <button className="btn-deposit" onClick={() => navigate('/money')}>Back</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="section-title">💳 Deposit Funds</div>
        
        {error && <div className="alert alert-error">{error}</div>}
        {message && <div className="alert" style={{ background: 'rgba(26, 255, 0, 0.1)', border: '1px solid var(--color-win)', color: 'var(--color-win)' }}>{message}</div>}

        {/* Deposit Type Selector */}
        <div className="league-filters" style={{ marginBottom: '20px' }}>
          <button
            type="button"
            className={`league-filter ${depositType === 'nigerian' ? 'active' : ''}`}
            onClick={() => setDepositType('nigerian')}
          >
            🇳🇬 Nigerian
          </button>
          <button
            type="button"
            className={`league-filter ${depositType === 'international' ? 'active' : ''}`}
            onClick={() => setDepositType('international')}
          >
            🌍 International
          </button>
        </div>

        {/* Bank Account Info Card */}
        <div className="account-card">
          <div className="account-field">
            <span className="field-label">Bank Name</span>
            <span className="field-value">{currentAccount.bankName}</span>
          </div>

          <div className="account-field">
            <span className="field-label">Account Number</span>
            <span className="field-value account-number">{currentAccount.accountNumber}</span>
          </div>

          <div className="account-field">
            <span className="field-label">Account Holder</span>
            <span className="field-value">{currentAccount.accountHolder}</span>
          </div>

          <div className="account-field">
            <span className="field-label">Currency</span>
            <span className="field-value">{currentAccount.currency}</span>
          </div>
        </div>

        {/* Warning Message */}
        <div className="deposit-warning">
          <span style={{ fontSize: '18px', marginRight: '8px' }}>⚠️</span>
          <div>
            <strong>IMPORTANT</strong>
            <p>Do NOT click "Confirm Deposit" until you have successfully sent the money to the account above.</p>
            <p>Clicking without payment may lead to account restriction.</p>
          </div>
        </div>

        {/* Deposit Form */}
        <form onSubmit={handleConfirmDeposit}>
          <div className="form-group">
            <label>Amount to Deposit ({currentAccount.currency})</label>
            <input
              type="number"
              placeholder="e.g., 10000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              step="0.01"
              min="100"
              style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 215, 0, 0.2)', color: 'var(--color-milk)', padding: '12px', borderRadius: '8px', fontSize: '14px', width: '100%', marginTop: '8px' }}
            />
          </div>

          {/* Confirmation Checkbox */}
          <div className="confirm-checkbox">
            <input
              type="checkbox"
              id="hasDeposited"
              checked={hasDeposited}
              onChange={(e) => setHasDeposited(e.target.checked)}
            />
            <label htmlFor="hasDeposited">
              I have successfully sent {amount || 'the amount'} {currentAccount.currency} to the account above
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !hasDeposited || !amount}
            className={`btn-primary ${!hasDeposited || !amount ? 'disabled' : ''}`}
            style={{
              width: '100%',
              background: (!hasDeposited || !amount) ? 'rgba(255, 215, 0, 0.3)' : 'var(--color-gold)',
              color: 'var(--bg-primary)',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: (!hasDeposited || !amount) ? 'not-allowed' : 'pointer',
              marginTop: '12px'
            }}
          >
            {loading ? 'Processing...' : 'Confirm Deposit'}
          </button>
        </form>

        {/* Instructions */}
        <div className="deposit-instructions" style={{ marginTop: '20px', marginBottom: '100px', background: 'rgba(255, 215, 0, 0.05)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255, 215, 0, 0.1)' }}>
          <h3 style={{ color: 'var(--color-gold)', marginBottom: '12px' }}>📖 How to Deposit</h3>
          <ol style={{ color: 'var(--color-milk)', paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Copy the account number above</li>
            <li>Send money via {currentAccount.bankName} or your preferred method</li>
            <li>Enter the amount you sent</li>
            <li>Check the confirmation box</li>
            <li>Click "Confirm Deposit"</li>
            <li>Admin will verify and credit your account</li>
          </ol>
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="bottom-nav">
        <a href="/" className="nav-item">
          <div className="nav-icon">🏠</div>
          Home
        </a>
        <a href="/sports" className="nav-item">
          <div className="nav-icon">⚽</div>
          Sports
        </a>
        <a href="/casino" className="nav-item">
          <div className="nav-icon">🎰</div>
          Casino
        </a>
        <a href="/money" className="nav-item active">
          <div className="nav-icon">💰</div>
          Money
        </a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
          <div className="nav-icon">👤</div>
          Account
        </a>
      </div>
    </div>
  );
};

export default Deposit;
