/**
 * COPILOT INSTRUCTION:
 * Routes are thin mapping to controllers.
 */

const express = require('express');
const auth = require('../middlewares/auth');
const walletController = require('../controllers/wallet.controller');

const router = express.Router();

router.get('/', auth, walletController.getWallet);
router.get('/all', walletController.getAllWallets);

module.exports = router;
