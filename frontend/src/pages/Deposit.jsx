import React, { useState } from 'react';
import { createDeposit } from '../api/depositAPI';
import '../styles/colors.css';
import '../styles/deposit.css';

const Deposit = () => {
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
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.error || 'Deposit confirmation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit-container">
      <div className="deposit-page">
        <h1 className="page-title">💳 Deposit Funds</h1>
        <p className="page-subtitle">Add money to your BETTING FLASH account</p>

        {error && <div className="alert alert-warning">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        {/* Deposit Type Selector */}
        <div className="deposit-type-selector">
          <button
            type="button"
            className={`type-btn ${depositType === 'nigerian' ? 'active' : ''}`}
            onClick={() => setDepositType('nigerian')}
          >
            🇳🇬 Nigerian
          </button>
          <button
            type="button"
            className={`type-btn ${depositType === 'international' ? 'active' : ''}`}
            onClick={() => setDepositType('international')}
          >
            🌍 International
          </button>
        </div>

        {/* Bank Account Info Card */}
        <div className="account-info-card">
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
        <div className="warning-box">
          <span className="warning-icon">⚠️</span>
          <div className="warning-content">
            <strong>IMPORTANT</strong>
            <p>Do NOT click "Confirm Deposit" until you have successfully sent the money to the account above.</p>
            <p>Clicking without payment may lead to account restriction.</p>
          </div>
        </div>

        {/* Deposit Form */}
        <form onSubmit={handleConfirmDeposit} className="deposit-form">
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
            className="btn-primary deposit-btn"
          >
            {loading ? 'Processing...' : 'Confirm Deposit'}
          </button>
        </form>

        {/* Instructions */}
        <div className="instructions">
          <h3>How to Deposit</h3>
          <ol>
            <li>Copy the account number above</li>
            <li>Send money via {currentAccount.bankName} or your preferred method</li>
            <li>Enter the amount you sent</li>
            <li>Check the confirmation box</li>
            <li>Click "Confirm Deposit"</li>
            <li>Admin will verify and credit your account</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
