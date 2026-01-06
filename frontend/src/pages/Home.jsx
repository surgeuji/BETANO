import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWallet } from '../api/walletAPI';
import { logout } from '../api/authAPI';
import '../styles/sportybet.css';
import TeamLogo from '../components/TeamLogo';
import { fetchLiveMatches } from '../api/liveAPI';

const Home = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [betSlip, setBetSlip] = useState({ selections: [], stake: '', open: false });
  const navigate = useNavigate();
  const [selectedLeague, setSelectedLeague] = useState('All');

  const [liveMatches, setLiveMatches] = useState([]);

  // Generate 1000+ mock games
  const generateMockGames = () => {
    const leagues = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Championship', 'Serie B', 'Eredivisie', 'Belgian Pro', 'Portuguese Liga'];
    const teams = [
      ['Manchester United', 'Liverpool'], ['Chelsea', 'Arsenal'], ['Man City', 'Tottenham'],
      ['Barcelona', 'Real Madrid'], ['Atletico Madrid', 'Sevilla'], ['Valencia', 'Bilbao'],
      ['AC Milan', 'Inter'], ['Roma', 'Napoli'], ['Juventus', 'Lazio'],
      ['Bayern Munich', 'Dortmund'], ['RB Leipzig', 'Frankfurt'], ['Leverkusen', 'Hoffenheim'],
      ['PSG', 'Marseille'], ['Lyon', 'Monaco'], ['Lille', 'Nice'],
      ['Ajax', 'PSV'], ['Feyenoord', 'Vitesse'], ['AZ Alkmaar', 'Utrecht'],
      ['Club Brugge', 'Genk'], ['Standard Liege', 'Anderlecht'], ['Sporting CP', 'Porto']
    ];
    
    const games = [];
    let id = 1;
    
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 100; j++) {
        const league = leagues[i];
        const teamPair = teams[Math.floor(Math.random() * teams.length)];
        const time = new Date(Date.now() + Math.random() * 86400000 * 7).toLocaleString();
        
        games.push({
          id: id++,
          league,
          home: teamPair[0],
          away: teamPair[1],
          time,
          odds: {
            '1': (1.5 + Math.random() * 1.5).toFixed(2),
            'X': (2.5 + Math.random() * 1.5).toFixed(2),
            '2': (1.5 + Math.random() * 1.5).toFixed(2)
          }
        });
      }
    }
    
    return games;
  };

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const data = await getWallet();
        setWallet(data);
      } catch (err) {
        setError('Failed to load wallet');
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
    
    // Load 1000 mock games
    const mockGames = generateMockGames();
    setLiveMatches(mockGames);
  }, []);

  const handleSelectOdd = (matchId, matchInfo, oddType, oddValue) => {
    const selection = {
      id: matchId,
      match: `${matchInfo.home} vs ${matchInfo.away}`,
      type: oddType,
      odd: oddValue,
    };

    setBetSlip(prev => {
      const exists = prev.selections.find(s => s.id === matchId);
      if (exists) {
        return {
          ...prev,
          selections: prev.selections.map(s => s.id === matchId ? selection : s)
        };
      }
      return {
        ...prev,
        selections: [...prev.selections, selection],
        open: true
      };
    });
  };

  const removeSelection = (matchId) => {
    setBetSlip(prev => ({
      ...prev,
      selections: prev.selections.filter(s => s.id !== matchId)
    }));
  };

  const calculateTotalOdds = () => {
    return betSlip.selections.reduce((total, s) => total * s.odd, 1).toFixed(2);
  };

  const calculatePotentialWin = () => {
    if (!betSlip.stake) return 0;
    return (parseFloat(betSlip.stake) * calculateTotalOdds()).toFixed(2);
  };

  const handlePlaceBet = () => {
    if (betSlip.selections.length === 0 || !betSlip.stake) {
      alert('Please select matches and enter stake');
      return;
    }
    alert(`Bet placed! Total odds: ${calculateTotalOdds()}, Potential win: ₦${calculatePotentialWin()}`);
    setBetSlip({ selections: [], stake: '', open: false });
  };

  return (
    <div>
      {/* HEADER */}
      <div className="header">
        <div className="header-logo">⚡ BETTING FLASH</div>
        <input className="header-search" placeholder="Search..." />
        <div className="header-actions">
          <button className="btn-deposit" onClick={() => navigate('/money')}>Deposit</button>
          {wallet && <div className="balance-display"><span className="balance-icon">🏦</span>₦{wallet.mainBalance?.toFixed(2) || '0.00'}</div>}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        {loading && <p style={{ padding: '20px', textAlign: 'center' }}>Loading matches...</p>}
        {error && <p style={{ padding: '20px', color: 'var(--color-loss)', textAlign: 'center' }}>{error}</p>}

        {!loading && (
          <>
            {/* LEAGUE FILTER */}
            <div style={{ padding: '10px 15px', backgroundColor: '#1a1f2e', borderBottom: '1px solid #2a2f3e', overflowX: 'auto' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setSelectedLeague('All')}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: selectedLeague === 'All' ? '#00FF7F' : '#2a2f3e',
                    color: selectedLeague === 'All' ? '#000' : '#aaa',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: selectedLeague === 'All' ? 'bold' : 'normal',
                    whiteSpace: 'nowrap'
                  }}
                >
                  All ({liveMatches.length})
                </button>
                {['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Championship'].map(league => {
                  const count = liveMatches.filter(m => m.league === league).length;
                  return (
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
                      {league} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="section-title">🔴 AVAILABLE ({(selectedLeague === 'All' ? liveMatches : liveMatches.filter(m => m.league === selectedLeague)).length} games)</div>
            {(selectedLeague === 'All' ? liveMatches : liveMatches.filter(m => m.league === selectedLeague)).map(match => (
              <div key={match.id} className="match-card">
                <div className="match-header">
                  <span>{match.league}</span>
                  <span className="match-badge">AVAILABLE</span>
                </div>

                <div className="match-info">
                  <div className="team-block">
                    <TeamLogo name={match.home} size={44} />
                    <div className="team-name">{match.home}</div>
                  </div>
                  <div className="vs-text">vs</div>
                  <div className="team-block">
                    <TeamLogo name={match.away} size={44} />
                    <div className="team-name">{match.away}</div>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '12px', textAlign: 'center' }}>
                  {match.time}
                </div>

                <div className="match-odds">
                  <button 
                    className="odd-btn"
                    onClick={() => handleSelectOdd(match.id, match, '1', match.odds['1'])}
                  >
                    <span className="odd-label">1</span>
                    {match.odds['1']}
                  </button>
                  <button 
                    className="odd-btn"
                    onClick={() => handleSelectOdd(match.id, match, 'X', match.odds['X'])}
                  >
                    <span className="odd-label">Draw</span>
                    {match.odds['X']}
                  </button>
                  <button 
                    className="odd-btn"
                    onClick={() => handleSelectOdd(match.id, match, '2', match.odds['2'])}
                  >
                    <span className="odd-label">2</span>
                    {match.odds['2']}
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* BET SLIP */}
      <div className={`bet-slip ${betSlip.open ? 'open' : ''}`}>
        <div className="bet-slip-header">
          <div className="bet-slip-title">Bet Slip ({betSlip.selections.length})</div>
          <button className="bet-slip-close" onClick={() => setBetSlip(prev => ({ ...prev, open: false }))}>✕</button>
        </div>

        {betSlip.selections.length > 0 ? (
          <>
            {betSlip.selections.map(selection => (
              <div key={selection.id} className="bet-selection">
                <div className="bet-selection-info">
                  <div className="bet-match">{selection.match}</div>
                  <div className="bet-odds">{selection.type} @ {selection.odd}</div>
                </div>
                <button className="remove-btn" onClick={() => removeSelection(selection.id)}>✕</button>
              </div>
            ))}

            <div className="bet-summary">
              <div className="summary-row">
                <span>Total Odds</span>
                <span>{calculateTotalOdds()}x</span>
              </div>
              <div className="summary-row">
                <span>Potential Win</span>
                <span style={{ color: 'var(--color-win)' }}>₦{calculatePotentialWin()}</span>
              </div>
            </div>

            <input 
              className="stake-input"
              type="number"
              placeholder="Enter stake amount"
              value={betSlip.stake}
              onChange={(e) => setBetSlip(prev => ({ ...prev, stake: e.target.value }))}
            />

            <button className="btn-place-bet" onClick={handlePlaceBet}>
              Place Bet - ₦{calculatePotentialWin()}
            </button>
          </>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--color-muted)', padding: '20px' }}>
            Select matches to create a bet
          </p>
        )}
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="bottom-nav">
        <a href="/" className="nav-item active">
          <div className="nav-icon">🏠</div>
          Home
        </a>
        <a href="/virtual" className="nav-item">
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
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); logout(); navigate('/login'); }}>
          <div className="nav-icon">👤</div>
          Account
        </a>
      </div>
    </div>
  );
};

export default Home;
