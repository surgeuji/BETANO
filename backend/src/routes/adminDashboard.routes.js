/**
 * Admin API endpoints for admin dashboard
 */

const express = require('express');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const UserService = require('../services/UserService');
const BetService = require('../services/BetService');
const CasinoService = require('../services/CasinoService');
const WalletService = require('../services/WalletService');
const VirtualGameService = require('../services/VirtualGameService');

const router = express.Router();

// Apply auth and admin check to all routes
router.use(auth, adminAuth());

// ===== USERS MANAGEMENT =====
router.get('/users', (req, res) => {
  try {
    const users = UserService.getAllUsers();
    const usersWithData = users.map(user => ({
      ...user,
      wallet: WalletService.getWallet(user.id),
      openBets: BetService.getUserBets(user.id).filter(b => b.status === 'PENDING').length,
      settledBets: BetService.getUserBets(user.id).filter(b => b.status !== 'PENDING').length
    }));
    res.json(usersWithData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/users/:userId', (req, res) => {
  try {
    const user = UserService.getUserById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      ...user,
      wallet: WalletService.getWallet(user.id),
      bets: BetService.getUserBets(user.id),
      casinoGames: CasinoService.getUserGames(user.id)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===== BETS MANAGEMENT =====
router.get('/bets/open', (req, res) => {
  try {
    const bets = BetService.getAllBets().filter(b => b.status === 'PENDING');
    const betsWithUser = bets.map(bet => ({
      ...bet,
      userEmail: UserService.getUserById(bet.userId)?.email || 'Unknown'
    }));
    res.json(betsWithUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/bets/settled', (req, res) => {
  try {
    const bets = BetService.getAllBets().filter(b => b.status !== 'PENDING');
    const betsWithUser = bets.map(bet => ({
      ...bet,
      userEmail: UserService.getUserById(bet.userId)?.email || 'Unknown'
    }));
    res.json(betsWithUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/bets/:betId/settle', (req, res) => {
  try {
    const { result, payout } = req.body;
    
    if (!result || payout === undefined) {
      return res.status(400).json({ error: 'Result and payout are required' });
    }

    const bet = BetService.settleBet(req.params.betId, result, payout);
    const user = UserService.getUserById(bet.userId);

    // Credit winnings to wallet if won
    if (result === 'WIN') {
      WalletService.creditWinnings(bet.userId, payout);
    }

    res.json({ 
      message: 'Bet settled',
      bet,
      userWallet: WalletService.getWallet(bet.userId)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===== CASINO GAMES MANAGEMENT =====
router.get('/casino/pending', (req, res) => {
  try {
    const games = CasinoService.getPendingGames();
    const gamesWithUser = games.map(game => ({
      ...game,
      userName: UserService.getUserById(game.userId)?.email || 'Unknown'
    }));
    res.json(gamesWithUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===== VIRTUAL GAMES MANAGEMENT =====
router.get('/virtual/games', (req, res) => {
  try {
    const games = VirtualGameService.getAllGames();
    res.json(games);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===== WALLET MANAGEMENT =====
router.post('/wallets/:userId/adjust', (req, res) => {
  try {
    const { amount, reason } = req.body;
    
    if (!amount || !reason) {
      return res.status(400).json({ error: 'Amount and reason are required' });
    }

    const currentBalance = WalletService.getWallet(req.params.userId)?.balance || 0;
    
    if (amount > 0) {
      WalletService.addBalance(req.params.userId, amount);
    } else {
      WalletService.deductBalance(req.params.userId, Math.abs(amount));
    }

    res.json({
      message: 'Wallet adjusted',
      userId: req.params.userId,
      previousBalance: currentBalance,
      amount,
      reason,
      newWallet: WalletService.getWallet(req.params.userId),
      adjustedBy: req.user.id
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/wallets/:userId', (req, res) => {
  try {
    const wallet = WalletService.getWallet(req.params.userId);
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
    
    res.json(wallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===== SYSTEM STATS =====
router.get('/stats', (req, res) => {
  try {
    const allUsers = UserService.getAllUsers();
    const allBets = BetService.getAllBets();
    const allCasinoGames = CasinoService.getAllGames();

    res.json({
      totalUsers: allUsers.length,
      totalBets: allBets.length,
      openBets: allBets.filter(b => b.status === 'PENDING').length,
      settledBets: allBets.filter(b => b.status !== 'PENDING').length,
      totalCasinoPlays: allCasinoGames.length,
      totalStaked: allBets.reduce((sum, b) => sum + (b.stake || 0), 0),
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
