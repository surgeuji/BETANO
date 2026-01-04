/**
 * COPILOT INSTRUCTION:
 * Casino controller handles casino games.
 *
 * CRITICAL RULES:
 * - Admin controls all outcomes
 * - NO RNG without admin approval
 */

const CasinoService = require('../services/CasinoService');

exports.startGame = (req, res) => {
  try {
    const { gameType, stake } = req.body;

    if (!gameType || !stake) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const game = CasinoService.startGame(req.user.id, gameType, stake);
    res.status(201).json(game);
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
