import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ManageVirtualGames = () => {
  const [games, setGames] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({ teamA: '', teamB: '', matchTime: '' });
  const [selectedGame, setSelectedGame] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/virtual/games`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGame = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/api/virtual/games`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchGames();
      setFormData({ teamA: '', teamB: '', matchTime: '' });
      setShowCreateForm(false);
      alert('✅ Virtual game created!');
    } catch (error) {
      alert('❌ Error: ' + error.response?.data?.error);
    }
  };

  const handleSettleGame = async (gameId, result) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/virtual/games/${gameId}/settle`,
        { result },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchGames();
      setSelectedGame(null);
      alert('✅ Game settled!');
    } catch (error) {
      alert('❌ Error: ' + error.response?.data?.error);
    }
  };

  return (
    <div className="admin-section">
      <h2>⚽ Virtual Games Manager</h2>

      <button 
        className="admin-btn-primary"
        onClick={() => setShowCreateForm(!showCreateForm)}
      >
        + Create Virtual Game
      </button>

      {showCreateForm && (
        <form onSubmit={handleCreateGame} className="admin-form">
          <h3>Create New Virtual Match</h3>
          <div className="admin-form-group">
            <label>Team A:</label>
            <input 
              type="text"
              value={formData.teamA}
              onChange={(e) => setFormData({...formData, teamA: e.target.value})}
              placeholder="e.g., Manchester United"
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Team B:</label>
            <input 
              type="text"
              value={formData.teamB}
              onChange={(e) => setFormData({...formData, teamB: e.target.value})}
              placeholder="e.g., Liverpool"
              required
            />
          </div>
          <div className="admin-form-group">
            <label>Match Time:</label>
            <input 
              type="datetime-local"
              value={formData.matchTime}
              onChange={(e) => setFormData({...formData, matchTime: e.target.value})}
              required
            />
          </div>
          <div className="admin-button-group">
            <button type="submit" className="admin-btn-confirm">Create Game</button>
            <button type="button" className="admin-btn-close" onClick={() => setShowCreateForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p>Loading games...</p>
      ) : (
        <div className="admin-grid">
          {games.map(game => (
            <div key={game.id} className="admin-card">
              <h4>{game.teamA} vs {game.teamB}</h4>
              <p><strong>Status:</strong> <span className={`status-${game.status.toLowerCase()}`}>{game.status}</span></p>
              <p><strong>League:</strong> {game.league}</p>
              <p><strong>Match Time:</strong> {new Date(game.matchTime).toLocaleString()}</p>
              {game.result && <p><strong>Result:</strong> {game.result}</p>}
              
              {game.status === 'SCHEDULED' || game.status === 'LIVE' ? (
                <div className="admin-button-group">
                  <button 
                    className="admin-btn-small"
                    onClick={() => setSelectedGame(game)}
                  >
                    Settle Game
                  </button>
                </div>
              ) : (
                <p className="admin-label-settled">✅ Settled</p>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedGame && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h3>Settle Game: {selectedGame.teamA} vs {selectedGame.teamB}</h3>
            <p>Choose the match result:</p>
            
            <div className="admin-button-group">
              <button 
                className="admin-btn-win"
                onClick={() => handleSettleGame(selectedGame.id, 'HOME_WIN')}
              >
                {selectedGame.teamA} Wins
              </button>
              <button 
                className="admin-btn-draw"
                onClick={() => handleSettleGame(selectedGame.id, 'DRAW')}
              >
                Draw
              </button>
              <button 
                className="admin-btn-lose"
                onClick={() => handleSettleGame(selectedGame.id, 'AWAY_WIN')}
              >
                {selectedGame.teamB} Wins
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

export default ManageVirtualGames;
