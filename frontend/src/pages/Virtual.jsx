import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFixtures } from '../api/fixtureAPI';
import { placeBet } from '../api/betAPI';
import { getWallet } from '../api/walletAPI';
import '../styles/sportybet.css';

const Virtual = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [betSlip, setBetSlip] = useState({ selections: [], stake: '', open: false });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('All');
  const navigate = useNavigate();

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
        const data = await getFixtures(1000);
        setGames(data);
        setFilteredGames(data);
      } catch (e) {
        console.error('Failed to load virtual games', e);
        setGames([]);
        setFilteredGames([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Handle search and league filter
  useEffect(() => {
    let filtered = games;

    // Filter by league
    if (selectedLeague !== 'All') {
      filtered = filtered.filter(g => g.league === selectedLeague);
    }

    // Filter by search term (team names or league)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(g =>
        g.team1.toLowerCase().includes(term) ||
        g.team2.toLowerCase().includes(term) ||
        g.league.toLowerCase().includes(term) ||
        g.country.toLowerCase().includes(term)
      );
    }

    setFilteredGames(filtered);
  }, [searchTerm, selectedLeague, games]);

  const handleSelectOdd = (gameId, game, oddType, oddValue) => {
    const selection = {
      id: gameId,
      match: `${game.team1} vs ${game.team2}`,
      type: oddType,
      odd: parseFloat(oddValue),
      league: game.league,
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

  const handlePlaceBet = async () => {
    if (!betSlip.stake || betSlip.selections.length === 0) {
      alert('Please enter stake and select at least one match');
      return;
    }

    if (wallet && parseFloat(betSlip.stake) > wallet.mainBalance) {
      alert('Insufficient balance');
      return;
    }

    try {
      const res = await placeBet(betSlip.selections, parseFloat(betSlip.stake), parseFloat(calculateTotalOdds()));
      const booking = res.bookingCode || res.bet?.bookingCode;
      if (booking) {
        alert(`Bet placed! Booking code: ${booking} — share to view selections.`);
      } else {
        alert('Bet placed! Check Open Bets.');
      }
      // Update wallet balance
      if (res.wallet) {
        setWallet(res.wallet);
      }
      setBetSlip({ selections: [], stake: '', open: false });
    } catch (e) {
      alert('Failed to place bet: ' + (e.response?.data?.error || e.message));
    }
  };

  const uniqueLeagues = ['All', ...new Set(games.map(g => g.league))];

  return (
    <div>
      <div className="header">
        <div className="header-logo">⚡ BETTING FLASH</div>
        <input
          className="header-search"
          placeholder="Search teams, leagues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="header-actions">
          <button className="btn-deposit" onClick={() => navigate('/money')}>Deposit</button>
          {wallet && <div className="balance-display"><span className="balance-icon">🏦</span>₦{wallet.mainBalance?.toFixed(2) || '0.00'}</div>}
        </div>
      </div>

      <div className="main-content">
        {loading ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>Loading 1000+ virtual games...</p>
        ) : (
          <>
            {/* League Filter */}
            <div style={{ padding: '10px 15px', backgroundColor: '#1a1f2e', borderBottom: '1px solid #2a2f3e', overflowX: 'auto' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {uniqueLeagues.slice(0, 20).map(league => (
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

            {filteredGames.length === 0 ? (
              <p style={{ padding: '20px', textAlign: 'center', color: 'var(--color-muted)' }}>No games found.</p>
            ) : (
              filteredGames.map(game => (
                <div key={game.id} className="match-card">
                  <div className="match-header">
                    <span>{game.league}</span>
                    <span className="match-badge">{game.status}</span>
                  </div>

                  <div className="match-info">
                    <div className="team-block">
                      <div style={{ fontSize: '40px', textAlign: 'center' }}>⚽</div>
                      <div className="team-name">{game.team1}</div>
                    </div>
                    <div className="vs-text">vs</div>
                    <div className="team-block">
                      <div style={{ fontSize: '40px', textAlign: 'center' }}>⚽</div>
                      <div className="team-name">{game.team2}</div>
                    </div>
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '12px', textAlign: 'center' }}>
                    {new Date(game.kickoff).toLocaleString()}
                  </div>

                  <div className="match-odds">
                    <button
                      className="odd-btn"
                      onClick={() => handleSelectOdd(game.id, game, `${game.team1} Win`, game.odds.team1)}
                    >
                      <span className="odd-label">{game.team1}</span>
                      {game.odds.team1}
                    </button>
                    <button
                      className="odd-btn"
                      onClick={() => handleSelectOdd(game.id, game, 'Draw', game.odds.draw)}
                    >
                      <span className="odd-label">Draw</span>
                      {game.odds.draw}
                    </button>
                    <button
                      className="odd-btn"
                      onClick={() => handleSelectOdd(game.id, game, `${game.team2} Win`, game.odds.team2)}
                    >
                      <span className="odd-label">{game.team2}</span>
                      {game.odds.team2}
                    </button>
                  </div>
                </div>
              ))
            )}
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
                <button onClick={() => removeSelection(selection.id)} style={{ background: 'none', border: 'none', color: '#FF3B3B', cursor: 'pointer' }}>×</button>
              </div>
            ))}
          </div>

          <div className="bet-slip-summary">
            <div className="summary-row">
              <span>Total Odds:</span>
              <span style={{ color: '#00FF7F', fontWeight: 'bold' }}>{calculateTotalOdds()}</span>
            </div>
            <div className="summary-row">
              <span>Stake:</span>
              <input
                type="number"
                value={betSlip.stake}
                onChange={(e) => setBetSlip({ ...betSlip, stake: e.target.value })}
                placeholder="0.00"
                style={{ width: '100px', padding: '6px', backgroundColor: '#0f1419', color: '#00FF7F', border: '1px solid #00FF7F', borderRadius: '4px' }}
              />
            </div>
            <div className="summary-row">
              <span>Potential Win:</span>
              <span style={{ color: '#00FF7F', fontWeight: 'bold', fontSize: '16px' }}>₦{calculatePotentialWin()}</span>
            </div>
            <button
              onClick={handlePlaceBet}
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '12px',
                backgroundColor: '#00FF7F',
                color: '#000',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              PLACE BET
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Virtual;
