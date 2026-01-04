/**
 * COPILOT INSTRUCTION:
 * Load environment variables ONLY.
 * Do NOT validate business logic here.
 * Do NOT expose secrets in logs.
 *
 * This system uses environment variables for:
 * - JWT secret
 * - API keys
 * - SMTP credentials
 *
 * NEVER hardcode credentials.
 */

require('dotenv').config();
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(48).toString('hex');
if (!process.env.JWT_SECRET) {
  // Log a warning so maintainers know to set a persistent secret in production
  console.warn('WARNING: JWT_SECRET not set in environment — using a generated temporary secret. Set JWT_SECRET in your environment for persistent tokens.');
}

module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET,
  API_FOOTBALL_KEY: process.env.API_FOOTBALL_KEY,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PHONE: process.env.ADMIN_PHONE,
};
