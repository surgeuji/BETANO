/**
 * COPILOT INSTRUCTION:
 * Withdrawal service handles withdrawal requests ONLY.
 *
 * CRITICAL RULES:
 * - User requests withdrawal
 * - Admin verifies bets
 * - Admin pays externally
 * - Admin marks COMPLETED manually
 * - Status NEVER changes automatically
 *
 * This service:
 * - Creates withdrawal requests
 * - Reads withdrawal state
 * - Admin modifies status (via admin service)
 */

const Withdrawal = require('../models/Withdrawal.model');

class WithdrawalService {
  constructor() {
    this.withdrawals = []; // In-memory withdrawal storage
  }

  createWithdrawal(userId, amount) {
    const withdrawal = new Withdrawal(userId, amount);
    this.withdrawals.push(withdrawal);
    return withdrawal;
  }

  getWithdrawal(withdrawalId) {
    return this.withdrawals.find(w => w.id === withdrawalId);
  }

  getUserWithdrawals(userId) {
    return this.withdrawals.filter(w => w.userId === userId);
  }

  getAllWithdrawals() {
    return this.withdrawals;
  }

  // TODO: Only admin can mark withdrawal as completed
  completeWithdrawal(withdrawalId, adminId) {
    const withdrawal = this.getWithdrawal(withdrawalId);
    if (!withdrawal) throw new Error('Withdrawal not found');
    
    withdrawal.status = 'COMPLETED';
    withdrawal.completedAt = new Date();
    withdrawal.completedBy = adminId;
    return withdrawal;
  }

  // TODO: Only admin can reject withdrawal
  rejectWithdrawal(withdrawalId, adminId) {
    const withdrawal = this.getWithdrawal(withdrawalId);
    if (!withdrawal) throw new Error('Withdrawal not found');
    
    withdrawal.status = 'REJECTED';
    return withdrawal;
  }
}

module.exports = new WithdrawalService();
