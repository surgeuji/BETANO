/**
 * COPILOT INSTRUCTION:
 * Virtual Game service handles admin-created matches.
 *
 * CRITICAL RULES:
 * - Admin creates matches
 * - Admin controls outcomes
 * - System auto-generates markets
 * - No RNG - admin settles results
 */

const VirtualGame = require('../models/VirtualGame.model');

class VirtualGameService {
  constructor() {
    this.games = []; // In-memory storage
  }

  createGame(teamA, teamB, league, matchTime) {
    if (!teamA || !teamB) {
      throw new Error('Team A and Team B are required');
    }

    const game = new VirtualGame(teamA, teamB, league, matchTime);
    this.games.push(game);
    return game;
  }

  getGame(gameId) {
    return this.games.find(g => g.id === gameId);
  }

  getAllGames() {
    return this.games;
  }

  getActiveGames() {
    return this.games.filter(g => g.status === 'SCHEDULED' || g.status === 'LIVE');
  }

  getGamesByStatus(status) {
    return this.games.filter(g => g.status === status);
  }

  updateGameStatus(gameId, newStatus) {
    const game = this.getGame(gameId);
    if (!game) throw new Error('Game not found');
    
    const validStatuses = ['SCHEDULED', 'LIVE', 'FINISHED'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    game.status = newStatus;
    return game;
  }

  settleGame(gameId, result, adminId) {
    const game = this.getGame(gameId);
    if (!game) throw new Error('Game not found');

    const validResults = ['HOME_WIN', 'DRAW', 'AWAY_WIN'];
    if (!validResults.includes(result)) {
      throw new Error(`Invalid result. Must be one of: ${validResults.join(', ')}`);
    }

    game.result = result;
    game.status = 'FINISHED';
    game.settledBy = adminId;
    game.settledAt = new Date();

    return game;
  }

  updateMarketOdds(gameId, market, marketData) {
    const game = this.getGame(gameId);
    if (!game) throw new Error('Game not found');

    if (market === '1X2') {
      game.markets.oneXTwo = marketData;
    } else if (market === 'OVER_UNDER') {
      game.markets.overUnder = marketData;
    } else if (market === 'BTTS') {
      game.markets.btts = marketData;
    } else {
      throw new Error('Invalid market type');
    }

    return game;
  }
}

module.exports = new VirtualGameService();
