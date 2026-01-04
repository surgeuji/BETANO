import React, { useState } from 'react';
import { placeBet } from '../api/betAPI';
import '../styles/global.css';

const SportsBetting = () => {
  const [stake, setStake] = useState('');
  const [odds, setOdds] = useState('');
  const [selections, setSelections] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleBet = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const mockSelections = Array.from({ length: selections }, (_, i) => ({
        id: i + 1,
        match: `Match ${i + 1}`,
        selection: 'Team A Win',
      }));

      await placeBet(mockSelections, parseFloat(stake), parseFloat(odds));
      setMessage('Bet placed successfully!');
      setStake('');
      setOdds('');
      setSelections(1);
    } catch (err) {
      setError(err.response?.data?.error || 'Bet placement failed');
    } finally {
      setLoading(false);
    }
  };

  const potentialPayout = (parseFloat(stake) || 0) * (parseFloat(odds) || 0);
  const bonus = potentialPayout * 0.03; // 3% bonus

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto' }}>
      <h1>Sports Betting</h1>
      {error && <p style={{ color: '#FF3B3B' }}>{error}</p>}
      {message && <p style={{ color: '#1AFF00' }}>{message}</p>}
      <form onSubmit={handleBet}>
        <label>
          Number of Selections (Max 60):
          <input
            type="number"
            min="1"
            max="60"
            value={selections}
            onChange={(e) => setSelections(parseInt(e.target.value))}
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </label>
        <input
          type="number"
          placeholder="Stake"
          value={stake}
          onChange={(e) => setStake(e.target.value)}
          required
          step="0.01"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <input
          type="number"
          placeholder="Odds"
          value={odds}
          onChange={(e) => setOdds(e.target.value)}
          required
          step="0.01"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <div className="card" style={{ marginBottom: '20px' }}>
          <p>
            <strong>Potential Payout:</strong> <span style={{ color: '#1AFF00' }}>${potentialPayout.toFixed(2)}</span>
          </p>
          <p>
            <strong>Bonus (3%):</strong> <span style={{ color: '#FFD700' }}>${bonus.toFixed(2)}</span>
          </p>
        </div>
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
          {loading ? 'Placing Bet...' : 'Place Bet'}
        </button>
      </form>
    </div>
  );
};

export default SportsBetting;
