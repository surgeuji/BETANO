import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ManageOpenBets = () => {
  const [bets, setBets] = useState([]);
  const [selectedBet, setSelectedBet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [settlement, setSettlement] = useState({ result: 'WIN', payout: 0 });

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchOpenBets();
  }, []);

  const fetchOpenBets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/admin/bets/open`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBets(response.data);
    } catch (error) {
      console.error('Error fetching bets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSettleBet = async (betId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/admin/bets/${betId}/settle`,
        settlement,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchOpenBets();
      setSelectedBet(null);
      alert('✅ Bet settled successfully!');
    } catch (error) {
      alert('❌ Error settling bet: ' + error.response?.data?.error);
    }
  };

  return (
    <div className="admin-section">
      <h2>🎯 Open Bets Management</h2>
      <p className="admin-subtitle">Total Open Bets: {bets.length}</p>

      {loading ? (
        <p>Loading open bets...</p>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Bet ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Stake</th>
                <th>Odds</th>
                <th>Potential Win</th>
                <th>Placed</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bets.map(bet => (
                <tr key={bet.id}>
                  <td>{bet.id}</td>
                  <td>{bet.userEmail}</td>
                  <td>{bet.betType}</td>
                  <td>${bet.stake}</td>
                  <td>{bet.odds}</td>
                  <td>${(bet.stake * bet.odds).toFixed(2)}</td>
                  <td>{new Date(bet.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="admin-btn-small"
                      onClick={() => setSelectedBet(bet)}
                    >
                      Settle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedBet && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h3>Settle Bet #{selectedBet.id}</h3>
            <p><strong>User:</strong> {selectedBet.userEmail}</p>
            <p><strong>Selections:</strong> {selectedBet.selections?.join(', ')}</p>
            <p><strong>Stake:</strong> ${selectedBet.stake}</p>
            <p><strong>Potential Win:</strong> ${(selectedBet.stake * selectedBet.odds).toFixed(2)}</p>

            <div className="admin-form-group">
              <label>Result:</label>
              <select 
                value={settlement.result}
                onChange={(e) => setSettlement({...settlement, result: e.target.value})}
              >
                <option value="WIN">✅ WIN</option>
                <option value="LOSE">❌ LOSE</option>
                <option value="VOID">⚪ VOID</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Payout Amount ($):</label>
              <input 
                type="number"
                value={settlement.payout}
                onChange={(e) => setSettlement({...settlement, payout: parseFloat(e.target.value)})}
                placeholder="0.00"
              />
            </div>

            <div className="admin-button-group">
              <button 
                className="admin-btn-confirm"
                onClick={() => handleSettleBet(selectedBet.id)}
              >
                Confirm Settlement
              </button>
              <button 
                className="admin-btn-close"
                onClick={() => setSelectedBet(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOpenBets;
