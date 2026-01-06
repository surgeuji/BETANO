/**
 * COPILOT INSTRUCTION:
 * Casino controller handles casino games.
 *
 * CRITICAL RULES:
 * - Admin controls all outcomes
 * - NO RNG without admin approval
 */

const CasinoService = require('../services/CasinoService');
const WalletService = require('../services/WalletService');

exports.startGame = (req, res) => {
  try {
    const { gameType, stake } = req.body;

    if (!gameType || !stake) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (stake <= 0) {
      return res.status(400).json({ error: 'Stake must be greater than 0' });
    }

    // Check if user has sufficient balance
    const wallet = WalletService.getWallet(req.user.id);
    if (!wallet || wallet.balance < stake) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Deduct stake from wallet
    WalletService.deductBalance(req.user.id, stake);

    const game = CasinoService.startGame(req.user.id, gameType, stake);
    res.status(201).json({ 
      message: 'Casino game started. Waiting for admin settlement.',
      game,
      wallet: WalletService.getWallet(req.user.id)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getGame = (req, res) => {
  try {
    const game = CasinoService.getGame(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserGames = (req, res) => {
  try {
    const games = CasinoService.getUserGames(req.user.id);
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllGames = (req, res) => {
  try {
    const games = CasinoService.getAllGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPendingGames = (req, res) => {
  try {
    const games = CasinoService.getPendingGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.settleGame = (req, res) => {
  try {
    const { result, payout } = req.body;
    const gameId = req.params.id;
    const adminId = req.user.id;

    if (!result || payout === undefined) {
      return res.status(400).json({ error: 'Missing required fields: result, payout' });
    }

    const validResults = ['WIN', 'LOSE'];
    if (!validResults.includes(result)) {
      return res.status(400).json({ error: 'Result must be WIN or LOSE' });
    }

    // Get the game
    const game = CasinoService.getGame(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Settle the game
    const settledGame = CasinoService.setGameResult(gameId, result, payout, adminId);

    // Update user wallet based on result
    if (result === 'WIN') {
      WalletService.addBalance(game.userId, payout);
    }

    res.json({ 
      message: `Casino game settled: ${result}`,
      game: settledGame,
      wallet: WalletService.getWallet(game.userId)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
