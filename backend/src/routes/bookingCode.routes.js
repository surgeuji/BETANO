/**
 * Booking Code Routes
 * User and admin endpoints for booking codes
 */

const express = require('express');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const bookingCodeController = require('../controllers/bookingCode.controller');

const router = express.Router();

// User routes - can view available codes and use them
router.get('/available', auth, bookingCodeController.getAvailableCodes);
router.get('/:codeId', auth, bookingCodeController.getCodeDetails);
router.post('/use', auth, bookingCodeController.useCode);

// Admin routes - full management
router.post('/', auth, adminAuth(), bookingCodeController.createCode);
router.get('/admin/all', auth, adminAuth(), bookingCodeController.getAllCodes);
router.patch('/:codeId/deactivate', auth, adminAuth(), bookingCodeController.deactivateCode);
router.delete('/:codeId', auth, adminAuth(), bookingCodeController.deleteCode);

module.exports = router;
