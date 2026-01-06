/**
 * Virtual Games Controller
 * Handles creation and management of virtual matches
 */

const VirtualGameService = require('../services/VirtualGameService');
const BetService = require('../services/BetService');

exports.createGame = async (req, res) => {
  try {
    const { teamA, teamB, league, matchTime } = req.body;

    if (!teamA || !teamB || !matchTime) {
      return res.status(400).json({ error: 'Missing required fields: teamA, teamB, matchTime' });
    }

    const game = VirtualGameService.createGame(teamA, teamB, league || 'Virtual League', matchTime);

    res.status(201).json({ 
      message: 'Virtual game created successfully',
      game 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getGame = async (req, res) => {
  try {
    const game = VirtualGameService.getGame(req.params.id);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllGames = async (req, res) => {
  try {
    const games = VirtualGameService.getAllGames();
    res.json(games);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getActiveGames = async (req, res) => {
  try {
    const games = VirtualGameService.getActiveGames();
    res.json(games);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateGameStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const game = VirtualGameService.updateGameStatus(req.params.id, status);

    res.json({ 
      message: `Game status updated to ${status}`,
      game 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.settleGame = async (req, res) => {
  try {
    const { result } = req.body;

    if (!result) {
      return res.status(400).json({ error: 'Result is required (HOME_WIN, DRAW, or AWAY_WIN)' });
    }

    const game = VirtualGameService.settleGame(req.params.id, result, req.user.id);

    res.json({ 
      message: 'Game settled successfully',
      game 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMarketOdds = async (req, res) => {
  try {
    const { market, odds } = req.body;

    if (!market || !odds) {
      return res.status(400).json({ error: 'Market and odds are required' });
    }

    const game = VirtualGameService.updateMarketOdds(req.params.id, market, odds);

    res.json({ 
      message: 'Market odds updated',
      game 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getGameBets = async (req, res) => {
  try {
    const game = VirtualGameService.getGame(req.params.id);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Get all bets related to this game
    const allBets = BetService.getAllBets();
    const gameBets = allBets.filter(bet => bet.gameId === req.params.id);

    res.json({
      game,
      bets: gameBets,
      totalBets: gameBets.length,
      pendingBets: gameBets.filter(b => b.status === 'PENDING').length,
      settledBets: gameBets.filter(b => b.status !== 'PENDING').length
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
