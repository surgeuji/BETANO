/**
 * COPILOT INSTRUCTION:
 * Virtual Game model defines structure ONLY.
 * NOT a database model. Shape definition only.
 *
 * CRITICAL RULES:
 * - Admin creates virtual matches
 * - Admin controls all outcomes
 * - System generates betting markets automatically
 * - No RNG - admin decides winner
 */

class VirtualGame {
  constructor(teamA, teamB, league, matchTime) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.teamA = teamA;
    this.teamB = teamB;
    this.league = league || 'Virtual League';
    this.matchTime = matchTime;
    this.status = 'SCHEDULED'; // SCHEDULED, LIVE, FINISHED
    this.createdAt = new Date();
    this.result = null; // Set by admin: 'HOME_WIN', 'DRAW', 'AWAY_WIN'
    
    // Auto-generated betting markets
    this.markets = {
      // 1X2 market
      oneXTwo: {
        home: { odd: 2.0, label: `${teamA} Win` },
        draw: { odd: 3.5, label: 'Draw' },
        away: { odd: 2.5, label: `${teamB} Win` }
      },
      // Over/Under (goals)
      overUnder: {
        over25: { odd: 1.9, label: 'Over 2.5' },
        under25: { odd: 1.9, label: 'Under 2.5' }
      },
      // Correct Score
      correctScore: {
        homeWin: { 
          '1-0': { odd: 4.0 },
          '2-0': { odd: 5.0 },
          '2-1': { odd: 6.0 },
          '3-0': { odd: 8.0 }
        },
        draw: {
          '0-0': { odd: 8.0 },
          '1-1': { odd: 5.0 },
          '2-2': { odd: 10.0 }
        },
        awayWin: {
          '0-1': { odd: 4.5 },
          '0-2': { odd: 6.0 },
          '1-2': { odd: 7.0 },
          '0-3': { odd: 10.0 }
        }
      },
      // Both Teams To Score
      btts: {
        yes: { odd: 1.85, label: 'BTTS Yes' },
        no: { odd: 1.95, label: 'BTTS No' }
      }
    };
  }
}

module.exports = VirtualGame;
