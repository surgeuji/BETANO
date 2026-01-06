import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWallet } from '../api/walletAPI';
import { logout } from '../api/authAPI';
import { getAllVirtualGames } from '../api/virtualAPI';
import '../styles/sportybet.css';
import TeamLogo from '../components/TeamLogo';
import { fetchLiveMatches } from '../api/liveAPI';

const Home = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [betSlip, setBetSlip] = useState({ selections: [], stake: '', open: false });
  const navigate = useNavigate();

  const [allMatches, setAllMatches] = useState([]);
  const [displayedMatches, setDisplayedMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(20);
  const [selectedLeague, setSelectedLeague] = useState('All');

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
    
    // Fetch all matches and virtual games
    (async () => {
      try {
        const liveMatches = await fetchLiveMatches();
        const virtualMatches = await getAllVirtualGames();
        
        // Combine and create up to 1000 mock games for demo
        let combinedMatches = [...liveMatches, ...virtualMatches];
        
        // Generate additional mock matches to reach ~1000 games
        const mockLeagues = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Champions League', 'Europa League', 'World Cup', 'Virtual League'];
        const mockTeams = ['Manchester United', 'Liverpool', 'Chelsea', 'Arsenal', 'Barcelona', 'Real Madrid', 'Bayern Munich', 'PSG', 'Juventus', 'Tottenham'];
        
        let gameCounter = combinedMatches.length;
        for (let i = 0; i < 950 - combinedMatches.length; i++) {
          const league = mockLeagues[Math.floor(Math.random() * mockLeagues.length)];
          const homeTeam = mockTeams[Math.floor(Math.random() * mockTeams.length)];
          let awayTeam = mockTeams[Math.floor(Math.random() * mockTeams.length)];
          while (awayTeam === homeTeam) {
            awayTeam = mockTeams[Math.floor(Math.random() * mockTeams.length)];
          }
          
          combinedMatches.push({
            id: `game-${gameCounter++}`,
            home: homeTeam,
            away: awayTeam,
            league: league,
            time: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleString(),
            odds: {
              '1': (1.5 + Math.random() * 2).toFixed(2),
              'X': (2.5 + Math.random() * 1.5).toFixed(2),
              '2': (1.5 + Math.random() * 2).toFixed(2)
            }
          });
        }
        
        setAllMatches(combinedMatches);
      } catch (e) {
        console.error('Failed to fetch matches', e);
      }
    })();
  }, []);

  // Filter and paginate matches
  useEffect(() => {
    const filtered = selectedLeague === 'All' 
      ? allMatches 
      : allMatches.filter(m => m.league === selectedLeague);
    
    const startIdx = (currentPage - 1) * gamesPerPage;
    const endIdx = startIdx + gamesPerPage;
    setDisplayedMatches(filtered.slice(startIdx, endIdx));
  }, [allMatches, currentPage, selectedLeague, gamesPerPage]);

  const handleSelectOdd = (matchId, matchInfo, oddType, oddValue) => {
    const selection = {
      id: matchId,
      match: `${matchInfo.home} vs ${matchInfo.away}`,
      type: oddType,
      odd: parseFloat(oddValue),
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

  const uniqueLeagues = ['All', ...new Set(allMatches.map(m => m.league))];
  const totalPages = Math.ceil((selectedLeague === 'All' ? allMatches.length : allMatches.filter(m => m.league === selectedLeague).length) / gamesPerPage);

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
        {loading && <p style={{ padding: '20px', textAlign: 'center' }}>Loading {allMatches.length} games...</p>}
        {error && <p style={{ padding: '20px', color: 'var(--color-loss)', textAlign: 'center' }}>{error}</p>}

        {!loading && (
          <>
            {/* LEAGUE FILTER */}
            <div style={{ padding: '10px 15px', backgroundColor: '#1a1f2e', borderBottom: '1px solid #2a2f3e', overflowX: 'auto' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {uniqueLeagues.map(league => (
                  <button
                    key={league}
                    onClick={() => { setSelectedLeague(league); setCurrentPage(1); }}
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

            <div className="section-title">🔴 AVAILABLE GAMES ({allMatches.length} total)</div>

            {displayedMatches.map(match => (
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

            {/* PAGINATION */}
            <div style={{ padding: '15px', textAlign: 'center', backgroundColor: '#1a1f2e' }}>
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{ marginRight: '10px', padding: '6px 12px', borderRadius: '4px', border: '1px solid #00FF7F', backgroundColor: currentPage === 1 ? '#2a2f3e' : '#00FF7F', color: currentPage === 1 ? '#666' : '#000', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
              >
                ← Previous
              </button>
              <span style={{ color: '#aaa', margin: '0 15px' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={{ marginLeft: '10px', padding: '6px 12px', borderRadius: '4px', border: '1px solid #00FF7F', backgroundColor: currentPage === totalPages ? '#2a2f3e' : '#00FF7F', color: currentPage === totalPages ? '#666' : '#000', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
              >
                Next →
              </button>
            </div>
          </>
        )}
      </div>

      {/* BET SLIP */}
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

          <button onClick={handlePlaceBet} className="btn-place-bet">
            PLACE BET
          </button>
        </div>
      )}

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
        <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
          <div className="nav-icon">👤</div>
          Account
        </a>
      </div>
    </div>
  );
};

export default Home;
