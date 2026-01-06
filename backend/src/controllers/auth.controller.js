/**
 * COPILOT INSTRUCTION:
 * Auth controller handles register and login.
 *
 * Responsibilities:
 * - Receive register/login requests
 * - Validate inputs
 * - Call UserService
 * - Return responses
 *
 * This controller:
 * - NEVER stores arrays
 * - NEVER holds balances
 * - NEVER computes odds
 */

const UserService = require('../services/UserService');
const WalletService = require('../services/WalletService');

exports.register = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if (!email || !phone || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await UserService.registerUser(email, phone, password);
    
    // Create wallet for new user
    WalletService.createWallet(user.id);

    res.status(201).json({ 
      message: 'User registered successfully',
      user: { id: user.id, email: user.email, phone: user.phone }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { user, token } = await UserService.loginUser(email, password);

    res.json({ 
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.registerAdmin = async (req, res) => {
  try {
    const { email, phone, password, role } = req.body;

    if (!email || !phone || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields (email, phone, password, role)' });
    }

    const validRoles = ['SUPER_ADMIN', 'FINANCE_ADMIN', 'OPERATIONS_ADMIN', 'SUPPORT_ADMIN'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: `Invalid role. Must be one of: ${validRoles.join(', ')}` });
    }

    const user = await UserService.registerUser(email, phone, password);
    user.role = role;
    
    // Create wallet for new admin user
    WalletService.createWallet(user.id);

    res.status(201).json({ 
      message: 'Admin user registered successfully',
      user: { id: user.id, email: user.email, phone: user.phone, role: user.role }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { user, token } = await UserService.loginUser(email, password);

    // Check if user has admin role
    const adminRoles = ['SUPER_ADMIN', 'FINANCE_ADMIN', 'OPERATIONS_ADMIN', 'SUPPORT_ADMIN'];
    if (!adminRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Admin access required. This account does not have admin privileges.' });
    }

    res.json({ 
      message: 'Admin login successful',
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
