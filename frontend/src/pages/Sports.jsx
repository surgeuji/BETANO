import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/sportybet.css';
import TeamLogo from '../components/TeamLogo';
import { fetchLiveMatches } from '../api/liveAPI';

const Sports = () => {
  const navigate = useNavigate();
  const [selectedLeague, setSelectedLeague] = useState('EPL');
  const [betSlip, setBetSlip] = useState({ selections: [], stake: '', open: false });

  const leagues = ['EPL', 'LaLiga', 'Serie A', 'Ligue 1', 'Champions League', 'NBA', 'NFL'];

  // Mock matches by league
  const matchesByLeague = {
    EPL: [
      { id: 1, home: 'Arsenal', away: 'Brighton', time: '14:30', odds: { '1': 1.75, 'X': 3.50, '2': 4.50 }, live: true },
      { id: 2, home: 'Liverpool', away: 'Man City', time: '16:45', odds: { '1': 1.85, 'X': 3.40, '2': 4.20 }, live: false },
      { id: 3, home: 'Chelsea', away: 'Tottenham', time: '18:00', odds: { '1': 1.95, 'X': 3.30, '2': 3.90 }, live: false },
    ],
    LaLiga: [
      { id: 4, home: 'Barcelona', away: 'Real Madrid', time: '19:00', odds: { '1': 1.90, 'X': 3.30, '2': 3.80 }, live: true },
      { id: 5, home: 'Atletico Madrid', away: 'Sevilla', time: '17:15', odds: { '1': 1.60, 'X': 3.70, '2': 5.20 }, live: false },
    ],
    'Serie A': [
      { id: 6, home: 'Juventus', away: 'Milan', time: '16:45', odds: { '1': 2.10, 'X': 3.20, '2': 3.40 }, live: true },
      { id: 7, home: 'Inter', away: 'Roma', time: '18:30', odds: { '1': 1.80, 'X': 3.45, '2': 4.10 }, live: false },
    ],
    'Ligue 1': [
      { id: 8, home: 'PSG', away: 'Monaco', time: '20:00', odds: { '1': 1.40, 'X': 4.20, '2': 6.50 }, live: false },
    ],
    'Champions League': [
      { id: 9, home: 'Bayern Munich', away: 'Manchester City', time: '20:00', odds: { '1': 2.40, 'X': 3.20, '2': 2.95 }, live: false },
      { id: 10, home: 'PSG', away: 'Real Madrid', time: '20:00', odds: { '1': 2.30, 'X': 3.30, '2': 3.10 }, live: false },
    ],
    NBA: [
      { id: 11, home: 'Lakers', away: 'Celtics', time: '22:30', odds: { '1': 1.95, 'X': 0, '2': 1.85 }, live: false },
    ],
    NFL: [
      { id: 12, home: 'Chiefs', away: 'Bills', time: '23:30', odds: { '1': 1.80, 'X': 0, '2': 2.05 }, live: false },
    ],
  };

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

  const [currentMatches, setCurrentMatches] = useState(matchesByLeague[selectedLeague] || []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const matches = await fetchLiveMatches(selectedLeague);
        if (mounted && matches) setCurrentMatches(matches);
      } catch (e) {
        console.error('Error fetching live matches', e);
        if (mounted) setCurrentMatches(matchesByLeague[selectedLeague] || []);
      }
    })();
    return () => { mounted = false; };
  }, [selectedLeague]);

  return (
    <div>
      {/* HEADER */}
      <div className="header">
        <div className="header-logo">⚡ BETTING FLASH</div>
        <input className="header-search" placeholder="Search..." />
        <div className="header-actions">
          <button className="btn-deposit" onClick={() => navigate('/money')}>Deposit</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="league-filters">
          {leagues.map(league => (
            <button
              key={league}
              className={`league-filter ${selectedLeague === league ? 'active' : ''}`}
              onClick={() => setSelectedLeague(league)}
            >
              {league}
            </button>
          ))}
        </div>

        <div className="section-title" style={{ marginTop: '12px' }}>{selectedLeague} Matches</div>

        {currentMatches.map(match => (
          <div key={match.id} className="match-card">
            <div className="match-header">
              <span style={{ fontSize: '12px' }}>{selectedLeague}</span>
              {match.live && <span className="match-badge">LIVE</span>}
            </div>

            <div className="match-info">
              <div className="team-block">
                <TeamLogo name={match.home} size={40} />
                <div className="team-name">{match.home}</div>
              </div>
              <div className="vs-text">vs</div>
              <div className="team-block">
                <TeamLogo name={match.away} size={40} />
                <div className="team-name">{match.away}</div>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '12px', textAlign: 'center' }}>
              {match.time}
            </div>

            <div className="match-odds">
              {match.odds['1'] && (
                <button 
                  className="odd-btn"
                  onClick={() => handleSelectOdd(match.id, match, '1', match.odds['1'])}
                >
                  <span className="odd-label">1</span>
                  {match.odds['1']}
                </button>
              )}
              {match.odds['X'] > 0 && (
                <button 
                  className="odd-btn"
                  onClick={() => handleSelectOdd(match.id, match, 'X', match.odds['X'])}
                >
                  <span className="odd-label">Draw</span>
                  {match.odds['X']}
                </button>
              )}
              {match.odds['2'] && (
                <button 
                  className="odd-btn"
                  onClick={() => handleSelectOdd(match.id, match, '2', match.odds['2'])}
                >
                  <span className="odd-label">2</span>
                  {match.odds['2']}
                </button>
              )}
            </div>
          </div>
        ))}
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
        <a href="/" className="nav-item">
          <div className="nav-icon">🏠</div>
          Home
        </a>
        <a href="/sports" className="nav-item active">
          <div className="nav-icon">⚽</div>
          Sports
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

export default Sports;
