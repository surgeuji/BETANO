import React, { useEffect, useState } from 'react';
import '../styles/sportybet.css';
import { getUserBets } from '../api/betAPI';

const OpenBets = () => {
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getUserBets();
        const running = data.filter(b => b.state === 'RUNNING');
        setBets(running);
      } catch (e) {
        console.error('Failed to load open bets', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <div className="header">
        <div className="header-logo">⚡ BETTING FLASH</div>
        <div className="header-actions">
          <div className="balance-display">Open Bets</div>
        </div>
      </div>

      <div className="main-content">
        <div className="section-title">Open Bets</div>
        {loading && <p style={{ padding: '20px', textAlign: 'center' }}>Loading open bets...</p>}
        {!loading && bets.length === 0 && (
          <p style={{ padding: '20px', textAlign: 'center', color: 'var(--color-muted)' }}>You have no open bets.</p>
        )}

        <div style={{ display: 'grid', gap: 12 }}>
          {bets.map(b => (
            <div key={b.id} className="match-card">
              <div className="match-header">
                <span>Bet #{b.id}</span>
                <span className="match-badge">RUNNING</span>
              </div>
              <div style={{ paddingTop: 8, color: 'var(--color-muted)', fontSize: 13 }}>{new Date(b.createdAt).toLocaleString()}</div>
              <div style={{ marginTop: 8 }}>
                {b.selections.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <div style={{ color: 'var(--color-milk)' }}>{s.match}</div>
                    <div style={{ color: 'var(--color-gold)' }}>{s.odd}</div>
                  </div>
                ))}
              </div>
              <div className="bet-summary" style={{ marginTop: 8 }}>
                <div className="summary-row"><span>Stake</span><span>₦{b.stake}</span></div>
                <div className="summary-row"><span>Total Odds</span><span>{b.totalOdds}x</span></div>
                <div className="summary-row"><span>Potential Win</span><span style={{ color: 'var(--color-win)' }}>₦{b.potentialWin}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-footer" style={{ padding: 16, textAlign: 'center', borderTop: '1px solid rgba(255,215,0,0.06)', marginTop: 12 }}>
        <div style={{ color: 'var(--color-muted)', fontSize: 13 }}>Open Bets footer — review your running bets here. Contact support for help.</div>
      </div>
    </div>
  );
};

export default OpenBets;
