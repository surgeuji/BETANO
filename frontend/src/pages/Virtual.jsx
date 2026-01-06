import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllVirtualGames } from '../api/virtualAPI';
import { getWallet } from '../api/walletAPI';
import '../styles/sportybet.css';
import TeamLogo from '../components/TeamLogo';

const Virtual = () => {
  const [games, setGames] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [betSlip, setBetSlip] = useState({ selections: [], stake: '', open: false });
  const navigate = useNavigate();
  const [selectedLeague, setSelectedLeague] = useState('All');

  useEffect(() => {
    (async () => {
      try {
        const data = await getWallet();
        setWallet(data);
      } catch (e) {
        console.error('Failed to load wallet');
      }
    })();

    (async () => {
      try {
        setLoading(true);
        const data = await getAllVirtualGames();
        setGames(data);
      } catch (e) {
        console.error('Failed to load virtual games');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSelectOdd = (gameId, matchInfo, oddType, oddValue) => {
    const selection = {
      id: gameId,
      match: `${matchInfo.teamA} vs ${matchInfo.teamB}`,
      type: oddType,
      odd: parseFloat(oddValue),
    };

    setBetSlip(prev => {
      const exists = prev.selections.find(s => s.id === gameId);
      if (exists) {
        return {
          ...prev,
          selections: prev.selections.map(s => s.id === gameId ? selection : s)
        };
      }
      return {
        ...prev,
        selections: [...prev.selections, selection],
        open: true
      };
    });
  };

  const removeSelection = (gameId) => {
    setBetSlip(prev => ({
      ...prev,
      selections: prev.selections.filter(s => s.id !== gameId)
    }));
  };

  const calculateTotalOdds = () => {
    return betSlip.selections.reduce((total, s) => total * s.odd, 1).toFixed(2);
  };

  const calculatePotentialWin = () => {
    if (!betSlip.stake) return 0;
    return (parseFloat(betSlip.stake) * calculateTotalOdds()).toFixed(2);
  };

  const filteredGames = selectedLeague === 'All' ? games : games.filter(g => g.league === selectedLeague);
  const uniqueLeagues = ['All', ...new Set(games.map(g => g.league))];

  return (
    <div>
      <div className="header">
        <div className="header-logo">⚡ BETTING FLASH</div>
        <input className="header-search" placeholder="Search..." />
        <div className="header-actions">
          <button className="btn-deposit" onClick={() => navigate('/money')}>Deposit</button>
          {wallet && <div className="balance-display"><span className="balance-icon">🏦</span>₦{wallet.mainBalance?.toFixed(2) || '0.00'}</div>}
        </div>
      </div>

      <div className="main-content">
        {loading ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>Loading virtual games...</p>
        ) : (
          <>
            <div style={{ padding: '10px 15px', backgroundColor: '#1a1f2e', borderBottom: '1px solid #2a2f3e', overflowX: 'auto' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {uniqueLeagues.map(league => (
                  <button
                    key={league}
                    onClick={() => setSelectedLeague(league)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: selectedLeague === league ? '#00FF7F' : '#2a2f3e',
                      color: selectedLeague === league ? '#000' : '#aaa',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: selectedLeague === league ? 'bold' : 'normal',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {league}
                  </button>
                ))}
              </div>
            </div>

            <div className="section-title">⚽ VIRTUAL GAMES ({filteredGames.length})</div>

            {filteredGames.map(game => (
              <div key={game.id} className="match-card">
                <div className="match-header">
                  <span>{game.league}</span>
                  <span className="match-badge">{game.status}</span>
                </div>

                <div className="match-info">
                  <div className="team-block">
                    <div style={{ fontSize: '40px', textAlign: 'center' }}>⚽</div>
                    <div className="team-name">{game.teamA}</div>
                  </div>
                  <div className="vs-text">vs</div>
                  <div className="team-block">
                    <div style={{ fontSize: '40px', textAlign: 'center' }}>⚽</div>
                    <div className="team-name">{game.teamB}</div>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '12px', textAlign: 'center' }}>
                  {new Date(game.matchTime).toLocaleString()}
                </div>

                <div className="match-odds">
                  <button 
                    className="odd-btn"
                    onClick={() => handleSelectOdd(game.id, game, `${game.teamA} Win`, game.markets.oneXTwo.home.odd)}
                  >
                    <span className="odd-label">{game.teamA}</span>
                    {game.markets.oneXTwo.home.odd}
                  </button>
                  <button 
                    className="odd-btn"
                    onClick={() => handleSelectOdd(game.id, game, 'Draw', game.markets.oneXTwo.draw.odd)}
                  >
                    <span className="odd-label">Draw</span>
                    {game.markets.oneXTwo.draw.odd}
                  </button>
                  <button 
                    className="odd-btn"
                    onClick={() => handleSelectOdd(game.id, game, `${game.teamB} Win`, game.markets.oneXTwo.away.odd)}
                  >
                    <span className="odd-label">{game.teamB}</span>
                    {game.markets.oneXTwo.away.odd}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {betSlip.open && (
        <div className="bet-slip">
          <div className="bet-slip-header">
            <h3>BET SLIP</h3>
            <button onClick={() => setBetSlip({ ...betSlip, open: false })} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '18px' }}>×</button>
          </div>
          
          <div className="bet-slip-selections">
            {betSlip.selections.map(selection => (
              <div key={selection.id} className="bet-slip-item">
                <div>
                  <div style={{ fontSize: '12px', color: '#aaa' }}>{selection.match}</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#00FF7F' }}>{selection.type} @ {selection.odd}</div>
                </div>
                <button onClick={() => removeSelection(selection.id)} style={{ background: 'none', border: 'none', color: '#FF3B3B', cursor: 'pointer' }}>Remove</button>
              </div>
            ))}
          </div>

          <div className="bet-slip-summary">
            <div className="summary-row">
              <span>Total Odds:</span>
              <span style={{ color: '#00FF7F', fontWeight: 'bold' }}>{calculateTotalOdds()}</span>
            </div>
            <div className="summary-row">
              <label>Stake (₦):</label>
              <input 
                type="number"
                value={betSlip.stake}
                onChange={(e) => setBetSlip({ ...betSlip, stake: e.target.value })}
                placeholder="0"
                style={{ width: '100px', padding: '4px', borderRadius: '4px', border: '1px solid #2a2f3e', backgroundColor: '#0B0F14', color: '#fff' }}
              />
            </div>
            <div className="summary-row">
              <span>Potential Win:</span>
              <span style={{ color: '#00FF7F', fontWeight: 'bold', fontSize: '16px' }}>₦{calculatePotentialWin()}</span>
            </div>
          </div>

          <button style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#00FF7F',
            color: '#000',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '10px'
          }}>
            PLACE BET
          </button>
        </div>
      )}

      <div className="bottom-nav">
        <a href="/" className="nav-item">
          <div className="nav-icon">🏠</div>
          Home
        </a>
        <a href="/virtual" className="nav-item active">
          <div className="nav-icon">⚽</div>
          Virtual
        </a>
        <a href="/casino" className="nav-item">
          <div className="nav-icon">🎰</div>
          Casino
        </a>
        <a href="/money" className="nav-item">
          <div className="nav-icon">💰</div>
          Money
        </a>
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
          <div className="nav-icon">👤</div>
          Account
        </a>
      </div>
    </div>
  );
};

export default Virtual;
