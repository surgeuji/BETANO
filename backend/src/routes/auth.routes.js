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
router.post('/register-admin', authController.registerAdmin);
router.post('/login', authController.login);
router.post('/admin-login', authController.adminLogin);

module.exports = router;
