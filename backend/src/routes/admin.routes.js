/**
 * COPILOT INSTRUCTION:
 * Admin routes are protected by admin middleware.
 *
 * TODO: Create comprehensive admin controls
 * - Approve/reject deposits
 * - Complete/reject withdrawals
 * - Settle bets
 * - Set casino outcomes
 * - Manage user wallets
 */

const express = require('express');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const DepositService = require('../services/DepositService');
const WithdrawalService = require('../services/WithdrawalService');
const BetService = require('../services/BetService');
const CasinoService = require('../services/CasinoService');
const WalletService = require('../services/WalletService');

const router = express.Router();

// Apply auth and admin check to all routes
router.use(auth, adminAuth());

// Deposit Management
router.post('/deposits/:id/approve', (req, res) => {
  try {
    const deposit = DepositService.approveDeposit(req.params.id, req.user.id);
    res.json(deposit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/deposits/:id/reject', (req, res) => {
  try {
    const deposit = DepositService.rejectDeposit(req.params.id, req.user.id);
    res.json(deposit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/deposits', (req, res) => {
  try {
    const deposits = DepositService.getAllDeposits();
    res.json(deposits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Withdrawal Management
router.post('/withdrawals/:id/complete', (req, res) => {
  try {
    const withdrawal = WithdrawalService.completeWithdrawal(req.params.id, req.user.id);
    res.json(withdrawal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/withdrawals/:id/reject', (req, res) => {
  try {
    const withdrawal = WithdrawalService.rejectWithdrawal(req.params.id, req.user.id);
    res.json(withdrawal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/withdrawals', (req, res) => {
  try {
    const withdrawals = WithdrawalService.getAllWithdrawals();
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Bet Settlement
router.post('/bets/:id/settle', (req, res) => {
  try {
    const { won, winnings } = req.body;
    const bet = BetService.settleBet(req.params.id, won, winnings, req.user.id);
    res.json(bet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/bets', (req, res) => {
  try {
    const bets = BetService.getAllBets();
    res.json(bets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Casino Outcome Management
router.post('/casino/:id/result', (req, res) => {
  try {
    const { result, payout } = req.body;
    const game = CasinoService.setGameResult(req.params.id, result, payout, req.user.id);
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/casino', (req, res) => {
  try {
    const games = CasinoService.getAllGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Wallet Management
router.put('/wallets/:userId/main-balance', (req, res) => {
  try {
    const { amount } = req.body;
    const wallet = WalletService.updateMainBalance(req.params.userId, amount);
    res.json(wallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/wallets/:userId/bonus-balance', (req, res) => {
  try {
    const { amount } = req.body;
    const wallet = WalletService.updateBonusBalance(req.params.userId, amount);
    res.json(wallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
