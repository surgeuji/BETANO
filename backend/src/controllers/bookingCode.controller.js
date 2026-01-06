/**
 * Booking Code Controller
 * Handles requests related to booking codes
 */

const BookingCodeService = require('../services/BookingCodeService');
const WalletService = require('../services/WalletService');
const BetService = require('../services/BetService');

exports.getAvailableCodes = (req, res) => {
  try {
    const codes = BookingCodeService.getActiveCodes();
    res.json(codes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCodeDetails = (req, res) => {
  try {
    const stats = BookingCodeService.getCodeStats(req.params.codeId);
    if (!stats) {
      return res.status(404).json({ error: 'Code not found' });
    }
    res.json(stats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.useCode = (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const result = BookingCodeService.validateAndUseCode(code, req.user.id);
    
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    // Apply bonus to wallet based on code type
    const bookingCode = result.code;
    let bonusAmount = 0;

    if (bookingCode.type === 'BONUS' || bookingCode.type === 'FREESPIN') {
      bonusAmount = bookingCode.value;
    } else if (bookingCode.type === 'CASHBACK') {
      bonusAmount = bookingCode.value;
    } else if (bookingCode.type === 'DISCOUNT') {
      bonusAmount = bookingCode.value;
    }

    // Add bonus to wallet
    if (bonusAmount > 0) {
      WalletService.addBalance(req.user.id, bonusAmount);
    }

    const wallet = WalletService.getWallet(req.user.id);

    res.json({
      message: `Successfully redeemed ${code}!`,
      bonusAmount,
      code: bookingCode,
      wallet
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ADMIN ONLY
exports.createCode = (req, res) => {
  try {
    const { code, type, value, expiresAt, maxUses } = req.body;

    if (!code || !type || !value || !expiresAt) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newCode = BookingCodeService.createCode(
      code.toUpperCase(),
      type,
      parseFloat(value),
      expiresAt,
      req.user.id,
      maxUses || 1
    );

    res.status(201).json({
      message: 'Booking code created successfully',
      code: newCode
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCodes = (req, res) => {
  try {
    const codes = BookingCodeService.getAllCodes();
    res.json(codes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deactivateCode = (req, res) => {
  try {
    const { codeId } = req.params;

    const updated = BookingCodeService.deactivateCode(parseInt(codeId));
    if (!updated) {
      return res.status(404).json({ error: 'Code not found' });
    }

    res.json({
      message: 'Code deactivated successfully',
      code: updated
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCode = (req, res) => {
  try {
    const { codeId } = req.params;

    const deleted = BookingCodeService.deleteCode(parseInt(codeId));
    if (!deleted) {
      return res.status(404).json({ error: 'Code not found' });
    }

    res.json({ message: 'Code deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Public lookup to reveal a bet's selections by booking code
exports.lookupBetByCode = (req, res) => {
  try {
    const code = req.params.code;
    if (!code) return res.status(400).json({ error: 'Code required' });

    const bet = BetService.getBetByBookingCode(code);
    if (!bet) return res.status(404).json({ error: 'Booking code not found or bet not available' });

    // Return only non-sensitive details
    return res.json({
      id: bet.id,
      selections: bet.selections,
      stake: bet.stake,
      odds: bet.odds,
      potentialPayout: bet.potentialPayout,
      createdAt: bet.createdAt,
      bookingCode: bet.bookingCode
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
