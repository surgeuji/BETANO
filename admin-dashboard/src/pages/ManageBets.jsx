import React, { useEffect, useState } from 'react';
import { getAllBets, settleBet } from '../api/adminBetAPI';
import '../styles/global.css';

const ManageBets = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [settleBets, setSettleBets] = useState({});

  useEffect(() => {
    fetchBets();
  }, []);

  const fetchBets = async () => {
    try {
      setLoading(true);
      const data = await getAllBets();
      setBets(data);
    } catch (err) {
      setError('Failed to load bets');
    } finally {
      setLoading(false);
    }
  };

  const handleSettle = async (betId, won) => {
    try {
      const winnings = settleBets[betId] || 0;
      await settleBet(betId, won, parseFloat(winnings));
      setMessage(`Bet ${won ? 'won' : 'lost'}`);
      setSettleBets({ ...settleBets, [betId]: '' });
      fetchBets();
    } catch (err) {
      setError('Failed to settle bet');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Settle Sports Bets</h1>
      {error && <p style={{ color: '#FF3B3B' }}>{error}</p>}
      {message && <p style={{ color: '#1AFF00' }}>{message}</p>}
      {loading && <p>Loading bets...</p>}
      {!loading && (
        <table>
          <thead>
            <tr>
              <th>Bet ID</th>
              <th>User ID</th>
              <th>Stake</th>
              <th>Odds</th>
              <th>Potential Payout</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bets.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No bets</td>
              </tr>
            ) : (
              bets.map((bet) => (
                <tr key={bet.id}>
                  <td>{bet.id}</td>
                  <td>{bet.userId}</td>
                  <td style={{ color: '#1AFF00' }}>${bet.stake}</td>
                  <td>{bet.odds}</td>
                  <td>${bet.potentialPayout.toFixed(2)}</td>
                  <td style={{
                    color: bet.status === 'ACTIVE' ? '#FFD700' :
                      bet.status === 'WON' ? '#1AFF00' :
                      bet.status === 'LOST' ? '#FF3B3B' : '#1E90FF'
                  }}>
                    {bet.status}
                  </td>
                  <td>
                    {bet.status === 'ACTIVE' && (
                      <>
                        <input
                          type="number"
                          placeholder="Winnings"
                          value={settleBets[bet.id] || ''}
                          onChange={(e) => setSettleBets({ ...settleBets, [bet.id]: e.target.value })}
                          style={{ width: '80px', marginRight: '5px' }}
                        />
                        <button
                          onClick={() => handleSettle(bet.id, true)}
                          style={{
                            backgroundColor: '#1AFF00',
                            color: '#0B0F14',
                            marginRight: '5px',
                          }}
                        >
                          Win
                        </button>
                        <button
                          onClick={() => handleSettle(bet.id, false)}
                          style={{
                            backgroundColor: '#FF3B3B',
                            color: '#FFFFFF',
                          }}
                        >
                          Loss
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageBets;
