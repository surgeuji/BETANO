/**
 * COPILOT INSTRUCTION:
 * Deposit service handles deposit requests ONLY.
 *
 * CRITICAL RULES:
 * - User sends money externally
 * - User marks deposit as PENDING
 * - Admin approves manually via /admin/deposits/:id/approve
 * - Status NEVER changes automatically
 *
 * This service:
 * - Creates deposit requests
 * - Reads deposit state
 * - Admin modifies status (via admin service)
 */

const Deposit = require('../models/Deposit.model');

class DepositService {
  constructor() {
    this.deposits = []; // In-memory deposit storage
  }

  createDeposit(userId, amount, reference) {
    const deposit = new Deposit(userId, amount, reference);
    this.deposits.push(deposit);
    return deposit;
  }

  getDeposit(depositId) {
    return this.deposits.find(d => d.id === depositId);
  }

  getUserDeposits(userId) {
    return this.deposits.filter(d => d.userId === userId);
  }

  getAllDeposits() {
    return this.deposits;
  }

  // TODO: Only admin can approve deposits
  approveDeposit(depositId, adminId) {
    const deposit = this.getDeposit(depositId);
    if (!deposit) throw new Error('Deposit not found');
    
    deposit.status = 'APPROVED';
    deposit.approvedAt = new Date();
    deposit.approvedBy = adminId;
    return deposit;
  }

  // TODO: Only admin can reject deposits
  rejectDeposit(depositId, adminId) {
    const deposit = this.getDeposit(depositId);
    if (!deposit) throw new Error('Deposit not found');
    
    deposit.status = 'REJECTED';
    return deposit;
  }
}

module.exports = new DepositService();
