/**
 * COPILOT INSTRUCTION:
 * JWT authentication middleware.
 *
 * This middleware:
 * - Validates JWT tokens
 * - Extracts user info
 * - Attaches user to request
 * - Returns 401 if invalid
 *
 * Frontend must send: Authorization: Bearer <token>
 */

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = auth;
