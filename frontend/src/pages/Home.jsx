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

  const [liveMatches, setLiveMatches] = useState([]);

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
    // fetch live matches (use env-configured provider if available)
    (async () => {
      try {
        const matches = await fetchLiveMatches();
        setLiveMatches(matches);
      } catch (e) {
        console.error('Failed to fetch live matches', e);
      }
    })();
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
            <div className="section-title">🔴 AVAILABLE</div>
            {liveMatches.map(match => (
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
        <a href="/sports" className="nav-item">
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
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); logout(); navigate('/login'); }}>
          <div className="nav-icon">👤</div>
          Account
        </a>
      </div>
    </div>
  );
};

export default Home;
