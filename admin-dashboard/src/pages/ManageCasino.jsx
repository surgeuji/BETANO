import React, { useEffect, useState } from 'react';
import { getAllGames, setGameResult } from '../api/adminCasinoAPI';
import '../styles/global.css';

const ManageCasino = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [gameResults, setGameResults] = useState({});

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const data = await getAllGames();
      setGames(data);
    } catch (err) {
      setError('Failed to load games');
    } finally {
      setLoading(false);
    }
  };

  const handleSetResult = async (gameId) => {
    try {
      const result = gameResults[gameId]?.result || 'WIN';
      const payout = gameResults[gameId]?.payout || 0;
      await setGameResult(gameId, result, parseFloat(payout));
      setMessage('Game result set');
      setGameResults({ ...gameResults, [gameId]: {} });
      fetchGames();
    } catch (err) {
      setError('Failed to set game result');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Manage Casino Games</h1>
      {error && <p style={{ color: '#FF3B3B' }}>{error}</p>}
      {message && <p style={{ color: '#1AFF00' }}>{message}</p>}
      {loading && <p>Loading games...</p>}
      {!loading && (
        <table>
          <thead>
            <tr>
              <th>Game ID</th>
              <th>User ID</th>
              <th>Type</th>
              <th>Stake</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>No games</td>
              </tr>
            ) : (
              games.map((game) => (
                <tr key={game.id}>
                  <td>{game.id}</td>
                  <td>{game.userId}</td>
                  <td>{game.gameType}</td>
                  <td style={{ color: '#1AFF00' }}>${game.stake}</td>
                  <td style={{
                    color: game.status === 'ACTIVE' ? '#FFD700' : '#1AFF00'
                  }}>
                    {game.status}
                  </td>
                  <td>
                    {game.status === 'ACTIVE' && (
                      <>
                        <select
                          value={gameResults[game.id]?.result || 'WIN'}
                          onChange={(e) => setGameResults({
                            ...gameResults,
                            [game.id]: { ...gameResults[game.id], result: e.target.value }
                          })}
                          style={{ marginRight: '5px' }}
                        >
                          <option value="WIN">Win</option>
                          <option value="LOSS">Loss</option>
                        </select>
                        <input
                          type="number"
                          placeholder="Payout"
                          value={gameResults[game.id]?.payout || ''}
                          onChange={(e) => setGameResults({
                            ...gameResults,
                            [game.id]: { ...gameResults[game.id], payout: e.target.value }
                          })}
                          style={{ width: '80px', marginRight: '5px' }}
                        />
                        <button
                          onClick={() => handleSetResult(game.id)}
                          style={{
                            backgroundColor: '#1AFF00',
                            color: '#0B0F14',
                          }}
                        >
                          Set Result
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

export default ManageCasino;
