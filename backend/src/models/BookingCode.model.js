/**
 * Booking Code Model
 * Admin-generated codes that users can use for various purposes
 */

let bookingCodes = [];
let codeIdCounter = 1;

class BookingCode {
  constructor(code, type, value, expiresAt, createdBy) {
    this.id = codeIdCounter++;
    this.code = code;
    this.type = type; // 'BONUS', 'CASHBACK', 'FREESPIN', 'DISCOUNT'
    this.value = value; // Amount or percentage
    this.expiresAt = expiresAt;
    this.createdAt = new Date();
    this.createdBy = createdBy; // Admin ID
    this.usedBy = []; // Array of {userId, usedAt}
    this.maxUses = 1; // How many times can be used
    this.currentUses = 0;
    this.isActive = true;
  }

  isExpired() {
    return new Date() > new Date(this.expiresAt);
  }

  canBeUsed() {
    return this.isActive && !this.isExpired() && this.currentUses < this.maxUses;
  }

  use(userId) {
    if (!this.canBeUsed()) {
      return false;
    }
    this.usedBy.push({ userId, usedAt: new Date() });
    this.currentUses++;
    return true;
  }
}

// Initialize with demo codes
const initializeDemoCodesIfNeeded = () => {
  if (bookingCodes.length === 0) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 30);
    
    bookingCodes = [
      new BookingCode('WELCOME100', 'BONUS', 100, tomorrow, 'admin1'),
      new BookingCode('SPIN50', 'FREESPIN', 50, tomorrow, 'admin1'),
      new BookingCode('LUCKY777', 'BONUS', 500, tomorrow, 'admin1'),
      new BookingCode('CASHBACK20', 'CASHBACK', 20, tomorrow, 'admin1'),
    ];

    // Update counters for demo codes
    bookingCodes.forEach((_, idx) => {
      codeIdCounter = idx + 2;
    });
  }
};

initializeDemoCodesIfNeeded();

module.exports = {
  BookingCode,
  
  createBookingCode(code, type, value, expiresAt, createdBy, maxUses = 1) {
    const newCode = new BookingCode(code, type, value, expiresAt, createdBy);
    newCode.maxUses = maxUses;
    bookingCodes.push(newCode);
    return newCode;
  },

  getBookingCode(code) {
    return bookingCodes.find(c => c.code === code);
  },

  getBookingCodeById(id) {
    return bookingCodes.find(c => c.id === id);
  },

  getAllBookingCodes() {
    return bookingCodes;
  },

  getActiveBookingCodes() {
    return bookingCodes.filter(c => c.isActive && !c.isExpired());
  },

  getBookingCodesByType(type) {
    return bookingCodes.filter(c => c.type === type);
  },

  updateBookingCode(id, updates) {
    const code = bookingCodes.find(c => c.id === id);
    if (!code) return null;
    Object.assign(code, updates);
    return code;
  },

  deleteBookingCode(id) {
    const index = bookingCodes.findIndex(c => c.id === id);
    if (index !== -1) {
      bookingCodes.splice(index, 1);
      return true;
    }
    return false;
  },

  useBookingCode(code, userId) {
    const bookingCode = bookingCodes.find(c => c.code === code);
    if (!bookingCode) {
      return { success: false, error: 'Code not found' };
    }
    
    if (!bookingCode.canBeUsed()) {
      return { success: false, error: 'Code expired or maximum uses reached' };
    }

    const alreadyUsed = bookingCode.usedBy.some(u => u.userId === userId);
    if (alreadyUsed) {
      return { success: false, error: 'You have already used this code' };
    }

    bookingCode.use(userId);
    return { success: true, code: bookingCode };
  },

  resetAllCodes() {
    bookingCodes = [];
    codeIdCounter = 1;
    initializeDemoCodesIfNeeded();
  }
};
