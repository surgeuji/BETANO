/**
 * COPILOT INSTRUCTION:
 * Routes are thin mapping to controllers.
 */

const express = require('express');
const auth = require('../middlewares/auth');
const casinoController = require('../controllers/casino.controller');

const router = express.Router();

router.post('/', auth, casinoController.startGame);
router.get('/:id', auth, casinoController.getGame);
router.get('/', auth, casinoController.getUserGames);

module.exports = router;
