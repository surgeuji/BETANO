/**
 * COPILOT INSTRUCTION:
 * Deposit model defines structure ONLY.
 * NOT a database model. Shape definition only.
 *
 * CRITICAL RULES:
 * - User sends money externally
 * - Marks deposit as PENDING
 * - Admin approves manually
 * - Status NEVER changes automatically
 */

class Deposit {
  constructor(userId, amount, reference) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.userId = userId;
    this.amount = amount;
    this.reference = reference;
    this.status = 'PENDING'; // PENDING, APPROVED, REJECTED
    this.createdAt = new Date();
    this.approvedAt = null;
    this.approvedBy = null;
  }
}

module.exports = Deposit;
