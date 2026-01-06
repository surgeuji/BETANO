/**
 * COPILOT INSTRUCTION:
 * Wallet service handles all balance logic.
 *
 * CRITICAL RULES:
 * - NEVER auto-update balances
 * - NEVER credit winnings automatically
 * - NEVER deduct balances automatically
 * - Only admins modify balances via explicit actions
 *
 * This service ONLY:
 * - Reads wallet state
 * - Creates REQUESTS (deposit / withdrawal)
 * - Admin must approve EVERYTHING
 */

const Wallet = require('../models/Wallet.model');

class WalletService {
  constructor() {
    this.wallets = []; // In-memory wallet storage
  }

  createWallet(userId) {
    const wallet = new Wallet(userId);
    this.wallets.push(wallet);
    return wallet;
  }

  getWallet(userId) {
    return this.wallets.find(w => w.userId === userId);
  }

  // TODO: Admin must manually approve before balance update
  updateMainBalance(userId, amount) {
    const wallet = this.getWallet(userId);
    if (!wallet) throw new Error('Wallet not found');
    wallet.mainBalance = amount;
    wallet.updatedAt = new Date();
    return wallet;
  }

  // TODO: Admin must manually approve before bonus applied
  updateBonusBalance(userId, amount) {
    const wallet = this.getWallet(userId);
    if (!wallet) throw new Error('Wallet not found');
    wallet.bonusBalance = amount;
    wallet.updatedAt = new Date();
    return wallet;
  }

  // TODO: Admin must manually calculate withdrawable amount
  updateWithdrawableBalance(userId, amount) {
    const wallet = this.getWallet(userId);
    if (!wallet) throw new Error('Wallet not found');
    wallet.withdrawableBalance = amount;
    wallet.updatedAt = new Date();
    return wallet;
  }

  // Deduct stake from main balance when user places a bet
  deductStake(userId, stake) {
    const wallet = this.getWallet(userId);
    if (!wallet) throw new Error('Wallet not found');
    if (wallet.mainBalance < stake) throw new Error('Insufficient balance');
    wallet.mainBalance -= stake;
    wallet.updatedAt = new Date();
    return wallet;
  }

  // Credit winning amount to main balance (admin settles bets manually)
  creditWinnings(userId, amount) {
    const wallet = this.getWallet(userId);
    if (!wallet) throw new Error('Wallet not found');
    wallet.mainBalance += amount;
    wallet.updatedAt = new Date();
    return wallet;
  }

  getAllWallets() {
    return this.wallets;
  }
}

module.exports = new WalletService();
