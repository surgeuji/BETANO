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

module.exports = {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  API_FOOTBALL_KEY: process.env.API_FOOTBALL_KEY,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PHONE: process.env.ADMIN_PHONE,
};
