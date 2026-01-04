import React, { useState } from 'react';
import { createDeposit } from '../api/depositAPI';
import '../styles/global.css';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDeposit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await createDeposit(parseFloat(amount), reference);
      setMessage('Deposit request created. Awaiting admin approval.');
      setAmount('');
      setReference('');
    } catch (err) {
      setError(err.response?.data?.error || 'Deposit failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h1>Deposit</h1>
      {error && <p style={{ color: '#FF3B3B' }}>{error}</p>}
      {message && <p style={{ color: '#1AFF00' }}>{message}</p>}
      <form onSubmit={handleDeposit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          step="0.01"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="Transaction Reference"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '20px' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: '#00FF7F',
            color: '#0B0F14',
            padding: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Processing...' : 'Request Deposit'}
        </button>
      </form>
      <p style={{ color: '#B0B0B0', fontSize: '12px' }}>
        Send money via external payment method, then provide reference above. Admin will approve manually.
      </p>
    </div>
  );
};

export default Deposit;
