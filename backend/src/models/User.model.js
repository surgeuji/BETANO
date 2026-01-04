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
    this.id = Math.random().toString(36).substr(2, 9);
    this.email = email;
    this.phone = phone;
    this.passwordHash = password; // Will be hashed by service
    this.createdAt = new Date();
    this.verified = false;
    this.role = 'USER'; // USER, SUPER_ADMIN, FINANCE_ADMIN, OPERATIONS_ADMIN, SUPPORT_ADMIN
  }
}

module.exports = User;
