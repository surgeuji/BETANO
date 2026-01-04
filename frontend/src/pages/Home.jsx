import React, { useEffect, useState } from 'react';
import { getWallet } from '../api/walletAPI';
import '../styles/global.css';

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
    <div style={{ padding: '20px' }}>
      <h1>Home</h1>
      {loading && <p>Loading wallet...</p>}
      {error && <p style={{ color: '#FF3B3B' }}>{error}</p>}
      {wallet && (
        <div className="card">
          <h2>Your Wallet</h2>
          <p>
            <strong>Main Balance:</strong> <span style={{ color: '#1AFF00' }}>${wallet.mainBalance}</span>
          </p>
          <p>
            <strong>Bonus Balance:</strong> <span style={{ color: '#FFD700' }}>${wallet.bonusBalance}</span>
          </p>
          <p>
            <strong>Withdrawable:</strong> <span style={{ color: '#1E90FF' }}>${wallet.withdrawableBalance}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
