/**
 * COPILOT INSTRUCTION:
 * Wallet model defines structure ONLY.
 * NOT a database model. Shape definition only.
 *
 * CRITICAL RULES:
 * - Balances NEVER auto-update
 * - Only admins modify balances
 * - Bonus is non-withdrawable
 */

class Wallet {
  constructor(userId) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.userId = userId;
    this.mainBalance = 0;
    this.bonusBalance = 0;
    this.withdrawableBalance = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

module.exports = Wallet;
