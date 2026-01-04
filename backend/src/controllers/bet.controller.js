/**
 * COPILOT INSTRUCTION:
 * Bet controller handles sports betting.
 *
 * CRITICAL RULES:
 * - Max selections: 60
 * - Status NEVER auto-settles
 * - Admin settles all bets manually
 */

const BetService = require('../services/BetService');

exports.placeBet = (req, res) => {
  try {
    const { selections, stake, odds } = req.body;

    if (!selections || !stake || !odds) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const bet = BetService.placeBet(req.user.id, selections, stake, odds);
    res.status(201).json(bet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBet = (req, res) => {
  try {
    const bet = BetService.getBet(req.params.id);
    if (!bet) {
      return res.status(404).json({ error: 'Bet not found' });
    }
    res.json(bet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserBets = (req, res) => {
  try {
    const bets = BetService.getUserBets(req.user.id);
    res.json(bets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getActiveBets = (req, res) => {
  try {
    const bets = BetService.getActiveBets();
    res.json(bets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
