/**
 * COPILOT INSTRUCTION:
 * Routes are thin mapping to controllers.
 *
 * This file:
 * - Maps endpoints to controllers
 * - Does NOT contain business logic
 * - Does NOT store data
 */

const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
