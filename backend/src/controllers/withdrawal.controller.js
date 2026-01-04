/**
 * COPILOT INSTRUCTION:
 * Withdrawal controller handles withdrawal requests.
 *
 * CRITICAL RULES:
 * - User requests withdrawal
 * - Admin verifies bets
 * - Admin pays externally
 * - Admin marks COMPLETED manually
 */

const WithdrawalService = require('../services/WithdrawalService');

exports.createWithdrawal = (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: 'Amount required' });
    }

    const withdrawal = WithdrawalService.createWithdrawal(req.user.id, amount);
    res.status(201).json(withdrawal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWithdrawal = (req, res) => {
  try {
    const withdrawal = WithdrawalService.getWithdrawal(req.params.id);
    if (!withdrawal) {
      return res.status(404).json({ error: 'Withdrawal not found' });
    }
    res.json(withdrawal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserWithdrawals = (req, res) => {
  try {
    const withdrawals = WithdrawalService.getUserWithdrawals(req.user.id);
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
