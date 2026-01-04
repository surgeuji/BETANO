import React, { useState } from 'react';
import { updateMainBalance, updateBonusBalance } from '../api/adminWalletAPI';
import '../styles/global.css';

const ManageWallets = () => {
  const [userId, setUserId] = useState('');
  const [mainBalance, setMainBalance] = useState('');
  const [bonusBalance, setBonusBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdateMainBalance = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await updateMainBalance(userId, parseFloat(mainBalance));
      setMessage('Main balance updated');
      setUserId('');
      setMainBalance('');
    } catch (err) {
      setError('Failed to update balance');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBonusBalance = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await updateBonusBalance(userId, parseFloat(bonusBalance));
      setMessage('Bonus balance updated');
      setUserId('');
      setBonusBalance('');
    } catch (err) {
      setError('Failed to update bonus');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', padding: '20px' }}>
      <h1>Manage User Wallets</h1>
      {error && <p style={{ color: '#FF3B3B' }}>{error}</p>}
      {message && <p style={{ color: '#1AFF00' }}>{message}</p>}

      <div className="card">
        <h2>Update Main Balance</h2>
        <form onSubmit={handleUpdateMainBalance}>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <input
            type="number"
            placeholder="New Main Balance"
            value={mainBalance}
            onChange={(e) => setMainBalance(e.target.value)}
            required
            step="0.01"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#00FF7F',
              color: '#0B0F14',
              padding: '10px',
            }}
          >
            {loading ? 'Updating...' : 'Update Main Balance'}
          </button>
        </form>
      </div>

      <div className="card">
        <h2>Update Bonus Balance</h2>
        <form onSubmit={handleUpdateBonusBalance}>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <input
            type="number"
            placeholder="New Bonus Balance"
            value={bonusBalance}
            onChange={(e) => setBonusBalance(e.target.value)}
            required
            step="0.01"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#FFD700',
              color: '#0B0F14',
              padding: '10px',
            }}
          >
            {loading ? 'Updating...' : 'Update Bonus Balance'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageWallets;
