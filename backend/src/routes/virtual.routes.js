/**
 * Virtual Games Routes
 * Protected by admin middleware
 */

const express = require('express');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const virtualGameController = require('../controllers/virtualGame.controller');

const router = express.Router();

// Public routes - get games
router.get('/games', virtualGameController.getAllGames);
router.get('/games/active', virtualGameController.getActiveGames);
router.get('/games/:id', virtualGameController.getGame);
router.get('/games/:id/bets', virtualGameController.getGameBets);

// Admin only routes
router.post('/games', auth, adminAuth(), virtualGameController.createGame);
router.put('/games/:id/status', auth, adminAuth(), virtualGameController.updateGameStatus);
router.post('/games/:id/settle', auth, adminAuth(), virtualGameController.settleGame);
router.put('/games/:id/odds', auth, adminAuth(), virtualGameController.updateMarketOdds);

module.exports = router;
