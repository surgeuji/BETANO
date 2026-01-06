/**
 * COPILOT INSTRUCTION:
 * Bet model defines structure ONLY.
 * NOT a database model. Shape definition only.
 *
 * CRITICAL RULES:
 * - Sports bets only, max 60 selections
 * - Status NEVER auto-settles
 * - Admin settles all bets manually
 * - Odds are read-only from API-Football
 */

class Bet {
  constructor(userId, selections, stake, odds) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.userId = userId;
    this.selections = selections; // Array of match selections
    this.stake = stake;
    this.odds = odds;
    this.potentialPayout = stake * odds;
    this.status = 'PENDING'; // PENDING (open), WON, LOST, SETTLED
    this.createdAt = new Date();
    this.settledAt = null;
    this.settledBy = null;
    this.winnings = 0;
    this.bookingCode = null; // assigned when bet is created
  }
}

module.exports = Bet;
