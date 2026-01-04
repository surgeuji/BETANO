/**
 * COPILOT INSTRUCTION:
 * Routes are thin mapping to controllers.
 */

const express = require('express');
const auth = require('../middlewares/auth');
const depositController = require('../controllers/deposit.controller');

const router = express.Router();

router.post('/', auth, depositController.createDeposit);
router.get('/:id', auth, depositController.getDeposit);
router.get('/', auth, depositController.getUserDeposits);

module.exports = router;
