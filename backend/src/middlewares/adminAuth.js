/**
 * COPILOT INSTRUCTION:
 * Admin authorization middleware.
 *
 * This middleware:
 * - Checks if user is admin
 * - Validates admin role
 * - Returns 403 if not authorized
 *
 * Must be used AFTER auth middleware.
 */

const adminAuth = (role) => {
  return (req, res, next) => {
    const adminRoles = ['SUPER_ADMIN', 'FINANCE_ADMIN', 'OPERATIONS_ADMIN', 'SUPPORT_ADMIN'];

    if (!req.user || !adminRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    if (role && req.user.role !== 'SUPER_ADMIN' && req.user.role !== role) {
      return res.status(403).json({ error: 'Insufficient admin permissions' });
    }

    next();
  };
};

module.exports = adminAuth;
