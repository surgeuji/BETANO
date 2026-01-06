/**
 * Booking Code Service
 * Handles business logic for booking codes
 */

const BookingCodeModel = require('../models/BookingCode.model');

class BookingCodeService {
  static createCode(code, type, value, expiresAt, createdBy, maxUses = 1) {
    // Validate code format
    if (!code || code.length < 3) {
      throw new Error('Code must be at least 3 characters');
    }

    // Check if code already exists
    if (BookingCodeModel.getBookingCode(code)) {
      throw new Error('Code already exists');
    }

    // Validate type
    const validTypes = ['BONUS', 'CASHBACK', 'FREESPIN', 'DISCOUNT'];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid type. Must be one of: ${validTypes.join(', ')}`);
    }

    // Validate value
    if (value <= 0) {
      throw new Error('Value must be greater than 0');
    }

    return BookingCodeModel.createBookingCode(code, type, value, expiresAt, createdBy, maxUses);
  }

  static getAllCodes() {
    return BookingCodeModel.getAllBookingCodes();
  }

  static getActiveCodes() {
    return BookingCodeModel.getActiveBookingCodes();
  }

  static getCodeDetails(codeId) {
    const code = BookingCodeModel.getBookingCodeById(codeId);
    if (!code) {
      throw new Error('Code not found');
    }
    return code;
  }

  static validateAndUseCode(codeString, userId) {
    return BookingCodeModel.useBookingCode(codeString, userId);
  }

  static deactivateCode(codeId) {
    return BookingCodeModel.updateBookingCode(codeId, { isActive: false });
  }

  static deleteCode(codeId) {
    return BookingCodeModel.deleteBookingCode(codeId);
  }

  static getCodeStats(codeId) {
    const code = BookingCodeModel.getBookingCodeById(codeId);
    if (!code) return null;

    return {
      id: code.id,
      code: code.code,
      type: code.type,
      value: code.value,
      totalUses: code.currentUses,
      maxUses: code.maxUses,
      remainingUses: code.maxUses - code.currentUses,
      isActive: code.isActive,
      isExpired: code.isExpired(),
      expiresAt: code.expiresAt,
      usedBy: code.usedBy
    };
  }
}

module.exports = BookingCodeService;
