/**
 * COPILOT INSTRUCTION:
 * Deposit controller handles deposit requests.
 *
 * CRITICAL RULES:
 * - User sends money externally
 * - User marks deposit as PENDING
 * - Admin approves manually
 * - Status NEVER changes automatically
 */

const DepositService = require('../services/DepositService');

exports.createDeposit = (req, res) => {
  try {
    const { amount, reference } = req.body;

    if (!amount || !reference) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const deposit = DepositService.createDeposit(req.user.id, amount, reference);
    res.status(201).json(deposit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getDeposit = (req, res) => {
  try {
    const deposit = DepositService.getDeposit(req.params.id);
    if (!deposit) {
      return res.status(404).json({ error: 'Deposit not found' });
    }
    res.json(deposit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserDeposits = (req, res) => {
  try {
    const deposits = DepositService.getUserDeposits(req.user.id);
    res.json(deposits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
