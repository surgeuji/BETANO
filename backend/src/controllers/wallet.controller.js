/**
 * COPILOT INSTRUCTION:
 * Wallet controller handles wallet requests.
 *
 * STRICT RULES:
 * - NEVER auto-update balances
 * - NEVER credit winnings automatically
 * - NEVER deduct balances automatically
 *
 * This controller:
 * - Reads wallet state
 * - Creates REQUESTS (deposit / withdrawal)
 *
 * Admin must approve EVERYTHING.
 */

const WalletService = require('../services/WalletService');

exports.getWallet = (req, res) => {
  try {
    const wallet = WalletService.getWallet(req.user.id);
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllWallets = (req, res) => {
  try {
    const wallets = WalletService.getAllWallets();
    res.json(wallets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
