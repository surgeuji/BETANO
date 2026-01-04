/**
 * COPILOT INSTRUCTION:
 * Routes are thin mapping to controllers.
 */

const express = require('express');
const auth = require('../middlewares/auth');
const withdrawalController = require('../controllers/withdrawal.controller');

const router = express.Router();

router.post('/', auth, withdrawalController.createWithdrawal);
router.get('/:id', auth, withdrawalController.getWithdrawal);
router.get('/', auth, withdrawalController.getUserWithdrawals);

module.exports = router;
