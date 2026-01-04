import React, { useState } from 'react';
import { createWithdrawal } from '../api/withdrawalAPI';
import '../styles/global.css';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await createWithdrawal(parseFloat(amount));
      setMessage('Withdrawal request created. Awaiting admin approval.');
      setAmount('');
    } catch (err) {
      setError(err.response?.data?.error || 'Withdrawal failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h1>Withdraw</h1>
      {error && <p style={{ color: '#FF3B3B' }}>{error}</p>}
      {message && <p style={{ color: '#1AFF00' }}>{message}</p>}
      <form onSubmit={handleWithdraw}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          step="0.01"
          style={{ width: '100%', marginBottom: '20px' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#1E90FF',
            color: '#FFFFFF',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Processing...' : 'Request Withdrawal'}
        </button>
      </form>
      <p style={{ color: '#B0B0B0', fontSize: '12px' }}>
        Admin will verify your bets and approve withdrawals manually.
      </p>
    </div>
  );
};

export default Withdraw;
