import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../api/authAPI';
import { getWallet } from '../api/walletAPI';
import { placeBet } from '../api/betAPI';
import '../styles/sportybet.css';

const Casino = () => {
  const navigate = useNavigate();
  const [stake, setStake] = useState(100);
  const [wallet, setWallet] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const casinoGames = [
    { id: 1, name: 'Lucky Spin', icon: '🎡', type: 'SPIN', category: 'Slots', odds: 1.5 },
    { id: 2, name: 'Blackjack Pro', icon: '🃏', type: 'BLACKJACK', category: 'Cards', odds: 1.8 },
    { id: 3, name: 'Roulette Royal', icon: '🎯', type: 'ROULETTE', category: 'Table', odds: 2.0 },
    { id: 4, name: 'Mega Slots', icon: '🎰', type: 'SPIN', category: 'Slots', odds: 2.5 },
    { id: 5, name: 'Poker Elite', icon: '♠️', type: 'POKER', category: 'Cards', odds: 1.7 },
    { id: 6, name: 'Baccarat Master', icon: '♥️', type: 'BACCARAT', category: 'Table', odds: 1.9 },
    { id: 7, name: 'Dice Roll', icon: '🎲', type: 'DICE', category: 'Dice', odds: 1.6 },
    { id: 8, name: 'Treasure Hunt', icon: '💎', type: 'SPIN', category: 'Slots', odds: 3.0 },
    { id: 9, name: 'Crash Game', icon: '🚀', type: 'CRASH', category: 'Multiplier', odds: 2.2 },
    { id: 10, name: 'Keno Master', icon: '🎯', type: 'KENO', category: 'Numbers', odds: 1.4 },
    { id: 11, name: 'Video Poker', icon: '♣️', type: 'POKER', category: 'Cards', odds: 1.8 },
    { id: 12, name: 'Dragon Fire', icon: '🐉', type: 'SPIN', category: 'Slots', odds: 2.8 },
    { id: 13, name: 'Golden Coins', icon: '🪙', type: 'SPIN', category: 'Slots', odds: 2.1 },
    { id: 14, name: 'Fortune Wheel', icon: '🎡', type: 'SPIN', category: 'Slots', odds: 2.3 },
    { id: 15, name: 'Wild West', icon: '🤠', type: 'SPIN', category: 'Slots', odds: 1.9 },
  ];

  useEffect(() => {
    (async () => {
      try {
        const data = await getWallet();
        setWallet(data);
      } catch (e) {
        console.error('Failed to load wallet');
      }
    })();
  }, []);

  const filteredGames = casinoGames.filter(game => {
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          game.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const uniqueCategories = ['All', ...new Set(casinoGames.map(g => g.category))];

  const handlePlayGame = async (gameName, gameType, odds) => {
    if (!isAuthenticated()) {
      alert('Please log in to play casino games');
      navigate('/login');
      return;
    }

    if (!stake || stake <= 0) {
      alert('Please enter a valid stake amount');
      return;
    }

    if (wallet && stake > wallet.mainBalance) {
      alert('Insufficient balance');
      return;
    }

    try {
      const selection = [{
        match: gameName,
        odd: odds,
        type: gameType
      }];
      const res = await placeBet(selection, stake, odds);
      const booking = res.bookingCode || res.bet?.bookingCode;
      if (booking) {
        alert(`🎉 ${gameName} played! Booking code: ${booking}\nStake: ₦${stake}\nPotential Win: ₦${(stake * odds).toFixed(2)}`);
      } else {
        alert(`✅ ${gameName} played! Check your bets.`);
      }
      if (res.wallet) {
        setWallet(res.wallet);
      }
      setStake(100);
    } catch (err) {
      console.error('Casino play error:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Failed to play game';
      alert(`❌ Error: ${errorMsg}`);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <div className="header">
        <div className="header-logo">⚡ BETTING FLASH</div>
        <input
          className="header-search"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="header-actions">
          <button className="btn-deposit" onClick={() => navigate('/money')}>Deposit</button>
          {wallet && <div className="balance-display"><span className="balance-icon">🏦</span>₦{wallet.mainBalance?.toFixed(2) || '0.00'}</div>}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="section-title">🎮 CASINO GAMES ({filteredGames.length})</div>

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

        {/* Category Filter */}
        <div style={{ padding: '10px 15px', backgroundColor: '#1a1f2e', borderBottom: '1px solid #2a2f3e', marginBottom: '15px', borderRadius: '6px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {uniqueCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: selectedCategory === category ? '#00FF7F' : '#2a2f3e',
                  color: selectedCategory === category ? '#000' : '#aaa',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: selectedCategory === category ? 'bold' : 'normal',
                  whiteSpace: 'nowrap'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="casino-grid">
          {filteredGames.map(game => (
            <div key={game.id} className="game-card">
              <div className="game-icon">{game.icon}</div>
              <div className="game-info">
                <h3 className="game-name">{game.name}</h3>
                <p className="game-category">{game.category}</p>
                <p style={{ fontSize: '12px', color: '#00FF7F', marginTop: '4px', fontWeight: 'bold' }}>@{game.odds}</p>
              </div>
              <button className="game-play-btn" onClick={() => handlePlayGame(game.name, game.type, game.odds)}>
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
