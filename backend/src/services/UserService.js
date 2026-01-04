/**
 * COPILOT INSTRUCTION:
 * User service contains business logic.
 *
 * Responsibilities:
 * - Hash passwords
 * - Register users
 * - Authenticate users
 * - Hold in-memory user state
 *
 * CRITICAL RULE:
 * - NO database calls
 * - Use in-memory arrays only
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const { JWT_SECRET } = require('../config/env');

class UserService {
  constructor() {
    this.users = []; // In-memory user storage
  }

  async registerUser(email, phone, password) {
    // Check if user exists
    if (this.users.find(u => u.email === email)) {
      throw new Error('User already exists');
    }

    const user = new User(email, phone, password);
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(password, salt);
    
    this.users.push(user);
    return user;
  }

  async loginUser(email, password) {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { user, token };
  }

  getUserById(userId) {
    return this.users.find(u => u.id === userId);
  }

  getAllUsers() {
    return this.users;
  }
}

module.exports = new UserService();
