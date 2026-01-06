import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAvailableCodes, useBookingCode, getBetByCode } from '../api/codesAPI';
import { getWallet } from '../api/walletAPI';
import '../styles/sportybet.css';

const BookingCodes = () => {
  const navigate = useNavigate();
  const [codes, setCodes] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [codeInput, setCodeInput] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sharedBet, setSharedBet] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [codesData, walletData] = await Promise.all([
          getAvailableCodes(),
          getWallet()
        ]);
        setCodes(codesData);
        setWallet(walletData);
      } catch (e) {
        setError('Failed to load booking codes');
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleUseCode = async (code) => {
    try {
      setError('');
      setMessage('');
      setSharedBet(null);
      const result = await useBookingCode(code);
      setMessage(`✅ ${result.message} +₦${result.bonusAmount}`);
      setWallet(result.wallet);
      setCodeInput('');
      setCodes(codes.filter(c => c.code !== code));
    } catch (err) {
      setError(`❌ ${err.response?.data?.error || 'Failed to use code'}`);
    }
  };

  const handleLoadSharedCode = async (code) => {
    try {
      setError('');
      setMessage('');
      const bet = await getBetByCode(code.toUpperCase());
      setSharedBet(bet);
      setCodeInput('');
    } catch (err) {
      setError(`❌ ${err.response?.data?.error || 'Code not found or invalid'}`);
      setSharedBet(null);
    }
  };

  const handleManualCodeInput = () => {
    if (!codeInput.trim()) {
      setError('Please enter a code');
      return;
    }
    handleLoadSharedCode(codeInput);
  };

  const getCodeIcon = (type) => {
    const icons = {
      'BONUS': '🎁',
      'CASHBACK': '💰',
      'FREESPIN': '🎡',
      'DISCOUNT': '🏷️'
    };
    return icons[type] || '🎟️';
  };

  const getCodeColor = (type) => {
    const colors = {
      'BONUS': '#00FF7F',
      'CASHBACK': '#FFD700',
      'FREESPIN': '#FF6B9D',
      'DISCOUNT': '#00D4FF'
    };
    return colors[type] || '#aaa';
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
        <div className="section-title">🎟️ BOOKING CODES & SHARED BETS</div>

        {/* CODE INPUT SECTION */}
        <div style={{ padding: '15px', backgroundColor: '#1a1f2e', borderRadius: '8px', marginBottom: '15px' }}>
          <p style={{ color: '#aaa', fontSize: '12px', marginBottom: '10px' }}>Load a shared betting code:</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              placeholder="Enter booking code (e.g., ABC123)"
              onKeyPress={(e) => e.key === 'Enter' && handleManualCodeInput()}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #2a2f3e',
                backgroundColor: '#0B0F14',
                color: '#fff',
                fontSize: '14px'
              }}
            />
            <button
              onClick={handleManualCodeInput}
              style={{
                padding: '10px 20px',
                backgroundColor: '#00FF7F',
                color: '#000',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              LOAD
            </button>
          </div>
        </div>

        {/* MESSAGES */}
        {message && (
          <div style={{
            padding: '12px',
            backgroundColor: '#1a3a1a',
            border: '1px solid #00FF7F',
            borderRadius: '6px',
            color: '#00FF7F',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{
            padding: '12px',
            backgroundColor: '#3a1a1a',
            border: '1px solid #FF3B3B',
            borderRadius: '6px',
            color: '#FF3B3B',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {/* SHARED BET DISPLAY */}
        {sharedBet && (
          <div style={{
            padding: '15px',
            backgroundColor: '#1a1f2e',
            border: '2px solid #00FF7F',
            borderRadius: '8px',
            marginBottom: '15px'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <h3 style={{ color: '#00FF7F', fontSize: '16px', marginBottom: '8px' }}>📋 Shared Bet Selections</h3>
              <p style={{ color: '#aaa', fontSize: '12px' }}>Booking Code: <span style={{ color: '#00FF7F', fontWeight: 'bold' }}>{sharedBet.bookingCode}</span></p>
            </div>
            <div style={{ display: 'grid', gap: '8px' }}>
              {sharedBet.selections && sharedBet.selections.map((selection, idx) => (
                <div key={idx} style={{
                  padding: '10px',
                  backgroundColor: '#0B0F14',
                  borderRadius: '6px',
                  borderLeft: '3px solid #00FF7F'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fff', fontSize: '14px' }}>{selection.match}</span>
                    <span style={{ color: '#00FF7F', fontWeight: 'bold', fontSize: '14px' }}>@ {selection.odd}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#aaa', marginTop: '4px' }}>{selection.type}</div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: '12px',
              paddingTop: '12px',
              borderTop: '1px solid #2a2f3e',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ fontSize: '12px', color: '#aaa' }}>Stake: <span style={{ color: '#fff', fontWeight: 'bold' }}>₦{sharedBet.stake}</span></p>
                <p style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>Total Odds: <span style={{ color: '#00FF7F', fontWeight: 'bold' }}>{(sharedBet.selections?.reduce((acc, s) => acc * s.odd, 1) || 1).toFixed(2)}</span></p>
              </div>
            </div>
          </div>
        )}

        {/* AVAILABLE CODES */}
        {loading ? (
          <p style={{ textAlign: 'center', color: '#aaa', padding: '20px' }}>Loading codes...</p>
        ) : codes.length === 0 ? (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            color: '#aaa'
          }}>
            <p style={{ fontSize: '48px', marginBottom: '10px' }}>🎟️</p>
            <p>No bonus codes available right now</p>
            <p style={{ fontSize: '12px', marginTop: '10px' }}>Share booking codes from your Virtual & Casino bets with friends</p>
          </div>
        ) : (
          <>
            <div className="section-title" style={{ marginTop: '20px' }}>🎁 BONUS CODES</div>
            <div style={{ display: 'grid', gap: '12px' }}>
              {codes.map(code => (
                <div
                  key={code.id}
                  style={{
                    padding: '15px',
                    backgroundColor: '#1a1f2e',
                    borderRadius: '8px',
                    border: `1px solid ${getCodeColor(code.type)}`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <div style={{ fontSize: '24px', marginBottom: '5px' }}>
                        {getCodeIcon(code.type)}
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginBottom: '5px' }}>
                        {code.code}
                      </div>
                      <div style={{ fontSize: '12px', color: '#aaa', marginBottom: '8px' }}>
                        {code.type} • ₦{code.value.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '11px', color: '#888' }}>
                        Expires: {new Date(code.expiresAt).toLocaleDateString()}
                      </div>
                    </div>
                    <button
                      onClick={() => handleUseCode(code.code)}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: getCodeColor(code.type),
                        color: '#000',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '12px',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      CLAIM
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
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
        <a href="/casino" className="nav-item">
          <div className="nav-icon">🎰</div>
          Casino
        </a>
        <a href="/money" className="nav-item">
          <div className="nav-icon">💰</div>
          Money
        </a>
        <a href="#" className="nav-item active">
          <div className="nav-icon">🎟️</div>
          Codes
        </a>
      </div>
    </div>
  );
};

export default BookingCodes;
