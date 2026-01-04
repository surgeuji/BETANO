const express = require('express');
const UserService = require('../services/UserService');

const router = express.Router();

// Simple health/debug endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: Date.now() });
});

// List in-memory users (sanitized)
router.get('/users', (req, res) => {
  try {
    const users = UserService.getAllUsers().map(u => ({ id: u.id, email: u.email, phone: u.phone, role: u.role }));
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get users' });
  }
});

module.exports = router;
