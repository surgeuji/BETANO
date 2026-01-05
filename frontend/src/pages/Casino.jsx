import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/sportybet.css';

const Casino = () => {
  const navigate = useNavigate();

  const casinoGames = [
    { id: 1, name: 'Lucky Spin', icon: '🎡', category: 'Slots' },
    { id: 2, name: 'Blackjack Pro', icon: '🃏', category: 'Cards' },
    { id: 3, name: 'Roulette Royal', icon: '🎯', category: 'Table' },
    { id: 4, name: 'Mega Slots', icon: '🎰', category: 'Slots' },
    { id: 5, name: 'Poker Elite', icon: '♠️', category: 'Cards' },
    { id: 6, name: 'Baccarat Master', icon: '♥️', category: 'Table' },
    { id: 7, name: 'Dice Roll', icon: '🎲', category: 'Dice' },
    { id: 8, name: 'Treasure Hunt', icon: '💎', category: 'Slots' },
  ];

  const handlePlayGame = (gameName) => {
    alert(`Starting ${gameName}...`);
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

        <div className="casino-grid">
          {casinoGames.map(game => (
            <div key={game.id} className="game-card">
              <div className="game-icon">{game.icon}</div>
              <div className="game-info">
                <h3 className="game-name">{game.name}</h3>
                <p className="game-category">{game.category}</p>
              </div>
              <button className="game-play-btn" onClick={() => handlePlayGame(game.name)}>
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
        <a href="/sports" className="nav-item">
          <div className="nav-icon">⚽</div>
          Sports
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
