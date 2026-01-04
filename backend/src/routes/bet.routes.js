/**
 * COPILOT INSTRUCTION:
 * Routes are thin mapping to controllers.
 */

const express = require('express');
const auth = require('../middlewares/auth');
const betController = require('../controllers/bet.controller');

const router = express.Router();

router.post('/', auth, betController.placeBet);
router.get('/:id', auth, betController.getBet);
router.get('/', auth, betController.getUserBets);
router.get('/active/all', betController.getActiveBets);

module.exports = router;
