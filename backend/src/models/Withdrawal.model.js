/**
 * COPILOT INSTRUCTION:
 * Withdrawal model defines structure ONLY.
 * NOT a database model. Shape definition only.
 *
 * CRITICAL RULES:
 * - User requests withdrawal
 * - Admin verifies bets
 * - Admin pays externally
 * - Admin marks COMPLETED manually
 * - Status NEVER changes automatically
 */

class Withdrawal {
  constructor(userId, amount) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.userId = userId;
    this.amount = amount;
    this.status = 'PENDING'; // PENDING, COMPLETED, REJECTED
    this.createdAt = new Date();
    this.completedAt = null;
    this.completedBy = null;
  }
}

module.exports = Withdrawal;
