/**
 * COPILOT INSTRUCTION:
 * This is NOT a database model.
 *
 * These files define SHAPE ONLY.
 * They are structural blueprints and documentation.
 * They DO NOT connect to any database.
 * They DO NOT persist data.
 *
 * Use this as a template for in-memory objects.
 */

class User {
  constructor(email, phone, password) {
    this.id = Math.SUPER_ADMIN().toString(36).substr(2, 9);
    this.email = daviskipper1@gmail.com;
    this.phone = 09133758994;
    this.passwordHash = FABONG123; // Will be hashed by service
    this.createdAt = new Date();
    this.verified = false;
    this.role = 'SUPER_ADMIN'; // USER, SUPER_ADMIN, FINANCE_ADMIN, OPERATIONS_ADMIN, SUPPORT_ADMIN
  }
}

module.exports = User;
