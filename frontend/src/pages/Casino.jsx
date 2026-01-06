import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../api/authAPI';
import '../styles/sportybet.css';
import { startGame, getGame } from '../api/casinoAPI';

const Casino = () => {
  const navigate = useNavigate();
  const [stake, setStake] = useState(100);

  const casinoGames = [
    { id: 1, name: 'Lucky Spin', icon: '🎡', type: 'SPIN', category: 'Slots' },
    { id: 2, name: 'Blackjack Pro', icon: '🃏', type: 'BLACKJACK', category: 'Cards' },
    { id: 3, name: 'Roulette Royal', icon: '🎯', type: 'ROULETTE', category: 'Table' },
    { id: 4, name: 'Mega Slots', icon: '🎰', type: 'SPIN', category: 'Slots' },
    { id: 5, name: 'Poker Elite', icon: '♠️', type: 'POKER', category: 'Cards' },
    { id: 6, name: 'Baccarat Master', icon: '♥️', type: 'BACCARAT', category: 'Table' },
    { id: 7, name: 'Dice Roll', icon: '🎲', type: 'DICE', category: 'Dice' },
    { id: 8, name: 'Treasure Hunt', icon: '💎', type: 'SPIN', category: 'Slots' },
    { id: 9, name: 'Crash Game', icon: '🚀', type: 'CRASH', category: 'Multiplier' },
    { id: 10, name: 'Keno Master', icon: '🎯', type: 'KENO', category: 'Numbers' },
  ];

  const handlePlayGame = (gameName, gameType) => {
    if (!isAuthenticated()) {
      alert('Please log in to play casino games');
      navigate('/login');
      return;
    }

    if (!stake || stake <= 0) {
      alert('Please enter a valid stake amount');
      return;
    }

    (async () => {
      try {
        console.log('Starting game:', gameType, 'Stake:', stake);
        const result = await startGame(gameType, stake);
        console.log('Game started:', result);
        
        const gameId = result.game?.id || result.gameId || result.id;
        if (!gameId) {
          alert(`✅ ${gameName} started! Waiting for admin to settle...`);
          setStake(100);
          return;
        }

        alert(`✅ ${gameName} started with stake ₦${stake}! Admin will settle your outcome.`);
        setStake(100);
      } catch (err) {
        console.error('Casino play error:', err);
        const errorMsg = err.response?.data?.error || err.message || 'Failed to start game';
        alert(`❌ Error: ${errorMsg}`);
      }
    })();
  };

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
        <div className="section-title">🎮 Casino Games</div>

        <div style={{ padding: '15px', backgroundColor: '#1a1f2e', borderRadius: '8px', marginBottom: '20px' }}>
          <label style={{ color: '#aaa', fontSize: '14px' }}>Stake Amount (₦):</label>
          <input 
            type="number"
            value={stake}
            onChange={(e) => setStake(parseFloat(e.target.value) || 0)}
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '8px',
              borderRadius: '6px', 
              border: '1px solid #00FF7F',
              backgroundColor: '#0B0F14',
              color: '#00FF7F',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          />
          <p style={{ color: '#666', fontSize: '12px', marginTop: '5px' }}>Minimum: ₦10 | Maximum: ₦100,000</p>
        </div>

        <div className="casino-grid">
          {casinoGames.map(game => (
            <div key={game.id} className="game-card">
              <div className="game-icon">{game.icon}</div>
              <div className="game-info">
                <h3 className="game-name">{game.name}</h3>
                <p className="game-category">{game.category}</p>
              </div>
              <button className="game-play-btn" onClick={() => handlePlayGame(game.name, game.type)}>
                Play
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="bottom-nav">
        <a href="/" className="nav-item">
          <div className="nav-icon">🏠</div>
          Home
        </a>
        <a href="/virtual" className="nav-item">
          <div className="nav-icon">⚽</div>
          Virtual
        </a>
        <a href="/casino" className="nav-item active">
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

export default Casino;
