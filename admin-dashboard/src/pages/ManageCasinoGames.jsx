import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ManageCasinoGames = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [settlement, setSettlement] = useState({ result: 'WIN', payout: 0 });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchPendingGames();
  }, []);

  const fetchPendingGames = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/casino/admin/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching casino games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSettleGame = async (gameId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/casino/${gameId}/settle`,
        settlement,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPendingGames();
      setSelectedGame(null);
      setSettlement({ result: 'WIN', payout: 0 });
      alert('✅ Casino game settled!');
    } catch (error) {
      alert('❌ Error: ' + error.response?.data?.error);
    }
  };

  return (
    <div className="admin-section">
      <h2>🎰 Casino Games Manager</h2>
      <p className="admin-subtitle">Pending Casino Plays: {games.length}</p>

      {loading ? (
        <p>Loading casino games...</p>
      ) : games.length === 0 ? (
        <p style={{textAlign: 'center', padding: '40px', color: '#888'}}>No pending casino games</p>
      ) : (
        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>Game ID</th>
                <th>User</th>
                <th>Game Type</th>
                <th>Stake</th>
                <th>Started</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {games.map(game => (
                <tr key={game.id}>
                  <td>{game.id}</td>
                  <td>{game.userId}</td>
                  <td>{game.gameType}</td>
                  <td>${game.stake}</td>
                  <td>{new Date(game.createdAt).toLocaleTimeString()}</td>
                  <td>
                    <button 
                      className="admin-btn-small"
                      onClick={() => setSelectedGame(game)}
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

      {selectedGame && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h3>Settle Casino Game</h3>
            <p><strong>Game Type:</strong> {selectedGame.gameType}</p>
            <p><strong>User ID:</strong> {selectedGame.userId}</p>
            <p><strong>Stake:</strong> ${selectedGame.stake}</p>

            <div className="admin-form-group">
              <label>Result:</label>
              <select 
                value={settlement.result}
                onChange={(e) => setSettlement({...settlement, result: e.target.value})}
              >
                <option value="WIN">✅ WIN</option>
                <option value="LOSE">❌ LOSE</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Payout ($):</label>
              <input 
                type="number"
                value={settlement.payout}
                onChange={(e) => setSettlement({...settlement, payout: parseFloat(e.target.value)})}
                placeholder="0.00"
                min="0"
              />
            </div>

            <div className="admin-button-group">
              <button 
                className="admin-btn-confirm"
                onClick={() => handleSettleGame(selectedGame.id)}
              >
                Confirm Settlement
              </button>
              <button 
                className="admin-btn-close"
                onClick={() => setSelectedGame(null)}
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

export default ManageCasinoGames;
