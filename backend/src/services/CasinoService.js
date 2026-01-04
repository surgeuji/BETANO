/**
 * COPILOT INSTRUCTION:
 * Casino service handles casino games.
 *
 * CRITICAL RULES:
 * - Admin controls all outcomes
 * - NO RNG without admin approval
 * - Games: Spin, Crash, Dice, Slots
 * - Outcome is set by admin BEFORE settlement
 */

const CasinoGame = require('../models/Casino.model');

class CasinoService {
  constructor() {
    this.games = []; // In-memory game storage
  }

  startGame(userId, gameType, stake) {
    // Validate game type
    const validGames = ['SPIN', 'CRASH', 'DICE', 'SLOTS'];
    if (!validGames.includes(gameType)) {
      throw new Error('Invalid game type');
    }

    const game = new CasinoGame(userId, gameType, stake);
    this.games.push(game);
    return game;
  }

  getGame(gameId) {
    return this.games.find(g => g.id === gameId);
  }

  getUserGames(userId) {
    return this.games.filter(g => g.userId === userId);
  }

  getAllGames() {
    return this.games;
  }

  // TODO: Only admin can set game result
  setGameResult(gameId, result, payout, adminId) {
    const game = this.getGame(gameId);
    if (!game) throw new Error('Game not found');
    
    game.result = result;
    game.payout = payout;
    game.status = 'COMPLETED';
    return game;
  }
}

module.exports = new CasinoService();
