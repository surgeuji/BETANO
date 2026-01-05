import React, { useEffect, useState } from 'react';
import { getWallet } from '../api/walletAPI';
import '../styles/pages.css';

const Home = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to BETANO</h1>
          <p className="hero-subtitle">Your Premier Betting Experience</p>
        </div>
      </section>

      {/* Main Dashboard */}
      <div className="dashboard-main">
        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading your wallet...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            <span>⚠️ {error}</span>
          </div>
        )}

        {wallet && (
          <>
            {/* Wallet Cards */}
            <section className="wallet-section">
              <h2 className="section-title">Your Wallet</h2>
              <div className="wallet-grid">
                <div className="wallet-card main-balance">
                  <div className="card-label">Main Balance</div>
                  <div className="card-amount">${wallet.mainBalance?.toFixed(2) || '0.00'}</div>
                  <div className="card-icon">💰</div>
                </div>

                <div className="wallet-card bonus-balance">
                  <div className="card-label">Bonus Balance</div>
                  <div className="card-amount">${wallet.bonusBalance?.toFixed(2) || '0.00'}</div>
                  <div className="card-icon">🎁</div>
                </div>

                <div className="wallet-card withdrawable">
                  <div className="card-label">Withdrawable</div>
                  <div className="card-amount">${wallet.withdrawableBalance?.toFixed(2) || '0.00'}</div>
                  <div className="card-icon">💳</div>
                </div>

                <div className="wallet-card total">
                  <div className="card-label">Total Balance</div>
                  <div className="card-amount">
                    ${(
                      (wallet.mainBalance || 0) + 
                      (wallet.bonusBalance || 0)
                    ).toFixed(2)}
                  </div>
                  <div className="card-icon">📊</div>
                </div>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="quick-actions-section">
              <h2 className="section-title">Quick Actions</h2>
              <div className="actions-grid">
                <a href="/deposit" className="action-btn deposit-btn">
                  <span className="action-icon">📥</span>
                  <span className="action-text">Deposit Funds</span>
                </a>
                <a href="/withdraw" className="action-btn withdraw-btn">
                  <span className="action-icon">📤</span>
                  <span className="action-text">Withdraw</span>
                </a>
                <a href="/sports" className="action-btn sports-btn">
                  <span className="action-icon">⚽</span>
                  <span className="action-text">Sports Betting</span>
                </a>
                <a href="/casino" className="action-btn casino-btn">
                  <span className="action-icon">🎰</span>
                  <span className="action-text">Casino Games</span>
                </a>
              </div>
            </section>

            {/* Promotions Section */}
            <section className="promotions-section">
              <h2 className="section-title">Featured Promotions</h2>
              <div className="promo-grid">
                <div className="promo-card">
                  <h3>Welcome Bonus</h3>
                  <p>Get up to 100% bonus on your first deposit</p>
                  <div className="promo-tag">Up to $500</div>
                </div>
                <div className="promo-card">
                  <h3>Daily Jackpot</h3>
                  <p>Win big with our daily jackpot draws</p>
                  <div className="promo-tag">Multiple Winners</div>
                </div>
                <div className="promo-card">
                  <h3>VIP Program</h3>
                  <p>Earn rewards and exclusive perks</p>
                  <div className="promo-tag">Exclusive</div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
