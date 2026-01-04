/**
 * COPILOT INSTRUCTION:
 * Casino model defines structure ONLY.
 * NOT a database model. Shape definition only.
 *
 * CRITICAL RULES:
 * - Admin controls all outcomes
 * - NO RNG without admin approval
 * - Games: Spin, Crash, Dice, Slots
 * - Outcome is set by admin BEFORE settlement
 */

class CasinoGame {
  constructor(userId, gameType, stake) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.userId = userId;
    this.gameType = gameType; // SPIN, CRASH, DICE, SLOTS
    this.stake = stake;
    this.status = 'ACTIVE'; // ACTIVE, COMPLETED
    this.createdAt = new Date();
    this.result = null; // Set by admin before completion
    this.payout = 0;
  }
}

module.exports = CasinoGame;
