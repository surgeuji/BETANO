import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWallet } from '../api/walletAPI';
import { logout } from '../api/authAPI';
import '../styles/sportybet.css';

const Money = () => {
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const data = await getWallet();
        setWallet(data);
      } catch (err) {
        setError('Failed to load wallet');
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="header">
          <div className="header-logo">⚡ BETTING FLASH</div>
          <div className="header-actions">
            <button className="btn-deposit">Loading...</button>
          </div>
        </div>
        <div className="main-content" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <p>Loading wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="header">
        <div className="header-logo">⚡ BETTING FLASH</div>
        <div className="header-actions">
          {wallet && <div className="balance-display"><span className="balance-icon">🏦</span>₦{wallet.mainBalance?.toFixed(2) || '0.00'}</div>}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {error && (
          <div className="alert alert-error">{error}</div>
        )}

        {wallet && (
          <>
            {/* Balance Overview */}
            <div className="section-title">Your Account</div>
            
            <div className="balance-cards">
              <div className="balance-card main">
                <div className="balance-label">Main Balance</div>
                <div className="balance-amount">₦{wallet.mainBalance?.toFixed(2) || '0.00'}</div>
              </div>
              <div className="balance-card bonus">
                <div className="balance-label">Bonus Balance</div>
                <div className="balance-amount">₦{wallet.bonusBalance?.toFixed(2) || '0.00'}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons" style={{ marginTop: '16px', marginBottom: '20px' }}>
              <button 
                className="action-btn-primary"
                onClick={() => navigate('/deposit')}
              >
                💰 Deposit Funds
              </button>
              <button 
                className="action-btn-secondary"
                onClick={() => navigate('/withdraw')}
              >
                📤 Withdraw
              </button>
            </div>

            {/* Tabs */}
            <div className="money-tabs">
              <button 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`tab-btn ${activeTab === 'transactions' ? 'active' : ''}`}
                onClick={() => setActiveTab('transactions')}
              >
                Transactions
              </button>
              <button 
                className={`tab-btn ${activeTab === 'bets' ? 'active' : ''}`}
                onClick={() => setActiveTab('bets')}
              >
                Open Bets
              </button>
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="tab-content">
                <div className="info-section">
                  <h3 style={{ color: 'var(--color-milk)', marginBottom: '16px' }}>Account Information</h3>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">user@example.com</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone</span>
                    <span className="info-value">+234 XXX XXX XXXX</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Member Since</span>
                    <span className="info-value">Jan 2024</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Account Status</span>
                    <span className="info-value" style={{ color: 'var(--color-win)' }}>✓ Active</span>
                  </div>
                </div>
              </div>
            )}

            {/* TRANSACTIONS TAB */}
            {activeTab === 'transactions' && (
              <div className="tab-content">
                <div className="transaction-list">
                  <div className="transaction-item deposit">
                    <div className="tx-info">
                      <div className="tx-type">Deposit</div>
                      <div className="tx-date">Today, 2:30 PM</div>
                    </div>
                    <div className="tx-amount" style={{ color: 'var(--color-win)' }}>+₦5,000</div>
                  </div>
                  <div className="transaction-item bet">
                    <div className="tx-info">
                      <div className="tx-type">Bet Placed</div>
                      <div className="tx-date">Today, 1:15 PM</div>
                    </div>
                    <div className="tx-amount" style={{ color: 'var(--color-loss)' }}>-₦1,000</div>
                  </div>
                  <div className="transaction-item win">
                    <div className="tx-info">
                      <div className="tx-type">Bet Won</div>
                      <div className="tx-date">Yesterday, 8:00 PM</div>
                    </div>
                    <div className="tx-amount" style={{ color: 'var(--color-win)' }}>+₦2,500</div>
                  </div>
                </div>
              </div>
            )}

            {/* OPEN BETS TAB */}
            {activeTab === 'bets' && (
              <div className="tab-content">
                <p style={{ textAlign: 'center', color: 'var(--color-muted)', padding: '20px' }}>
                  No open bets
                </p>
              </div>
            )}

            {/* Promo Section */}
            <div className="promo-box" style={{ marginTop: '20px' }}>
              <div className="promo-content">
                <span>🎉 Earn rewards with every bet!</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="bottom-nav">
        <a href="/" className="nav-item">
          <div className="nav-icon">🏠</div>
          Home
        </a>
        <a href="/virtual" className="nav-item">
          <div className="nav-icon">⚽</div>
          Virtual
        </a>
        <a href="/casino" className="nav-item">
          <div className="nav-icon">🎰</div>
          Casino
        </a>
        <a href="/money" className="nav-item active">
          <div className="nav-icon">💰</div>
          Money
        </a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); logout(); navigate('/login'); }}>
          <div className="nav-icon">👤</div>
          Account
        </a>
      </div>
    </div>
  );
};

export default Money;
