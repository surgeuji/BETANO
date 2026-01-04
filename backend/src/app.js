/**
 * COPILOT INSTRUCTION:
 * This file ONLY configures Express.
 * Do NOT start the server here.
 * Do NOT write business logic here.
 * Do NOT store data permanently.
 *
 * Responsibilities:
 * - Initialize Express
 * - Register middlewares
 * - Register routes
 * - Centralized error handling
 *
 * This app runs WITHOUT a database.
 */

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const walletRoutes = require('./routes/wallet.routes');
const depositRoutes = require('./routes/deposit.routes');
const withdrawalRoutes = require('./routes/withdrawal.routes');
const betRoutes = require('./routes/bet.routes');
const casinoRoutes = require('./routes/casino.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/deposits', depositRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/casino', casinoRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
