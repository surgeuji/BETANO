import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/sportybet.css';
import { startGame, getGame } from '../api/casinoAPI';

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
    (async () => {
      try {
        const stake = 100; // default demo stake
        const result = await startGame(gameName.toUpperCase().slice(0,6), stake);
        // result should contain gameId
        const gameId = result.id || result.gameId;
        if (!gameId) {
          alert('Game started (no id returned)');
          return;
        }
        // poll for result
        const poll = async () => {
          const state = await getGame(gameId);
          if (state && state.result) {
            alert(`${gameName} result: ${state.result} | Payout: ${state.payout || 0}`);
          } else {
            setTimeout(poll, 1000);
          }
        };
        poll();
      } catch (err) {
        console.error('Casino play error', err);
        alert('Failed to start game. Ensure you are logged in.');
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
