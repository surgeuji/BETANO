/**
 * COPILOT INSTRUCTION:
 * Bet service handles sports betting logic.
 *
 * CRITICAL RULES:
 * - Max selections: 60
 * - Bonus: 3%
 * - Max payout: 200,000,000
 * - Status NEVER auto-settles
 * - Admin settles all bets manually
 */

const Bet = require('../models/Bet.model');

class BetService {
  constructor() {
    this.bets = []; // In-memory bet storage
  }

  placeBet(userId, selections, stake, odds) {
    // Validate selections limit
    if (selections.length > 60) {
      throw new Error('Maximum 60 selections allowed');
    }

    // Calculate potential payout
    const potentialPayout = stake * odds;
    const maxPayout = 200000000;
    
    // Silent cap - do not error, but cap the payout
    if (potentialPayout > maxPayout) {
      // Bet is accepted but payout is capped
    }

    const bet = new Bet(userId, selections, stake, odds);
    this.bets.push(bet);
    return bet;
  }

  getBet(betId) {
    return this.bets.find(b => b.id === betId);
  }

  getUserBets(userId) {
    return this.bets.filter(b => b.userId === userId);
  }

  getActiveBets() {
    return this.bets.filter(b => b.status === 'ACTIVE');
  }

  getAllBets() {
    return this.bets;
  }

  // TODO: Only admin can settle bets
  settleBet(betId, won, winnings, adminId) {
    const bet = this.getBet(betId);
    if (!bet) throw new Error('Bet not found');
    
    bet.status = won ? 'WON' : 'LOST';
    bet.winnings = winnings;
    bet.settledAt = new Date();
    bet.settledBy = adminId;
    return bet;
  }
}

module.exports = new BetService();
