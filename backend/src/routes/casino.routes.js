/**
 * COPILOT INSTRUCTION:
 * Routes are thin mapping to controllers.
 */

const express = require('express');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const casinoController = require('../controllers/casino.controller');

const router = express.Router();

// User routes
router.post('/', auth, casinoController.startGame);
router.get('/user/games', auth, casinoController.getUserGames);
router.get('/:id', auth, casinoController.getGame);

// Admin routes
router.get('/admin/all', auth, adminAuth(), casinoController.getAllGames);
router.get('/admin/pending', auth, adminAuth(), casinoController.getPendingGames);
router.post('/:id/settle', auth, adminAuth(), casinoController.settleGame);

module.exports = router;
