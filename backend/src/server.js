/**
 * COPILOT INSTRUCTION:
 * This is the ONLY file allowed to start the server.
 *
 * Rules:
 * - Must listen on process.env.PORT
 * - Must NOT hardcode port
 * - Must NOT include business logic
 *
 * This file is required for Render deployment.
 */

const app = require('./app');
const { PORT } = require('./config/env');
const UserService = require('./services/UserService');

// Initialize admin user on startup
async function initializeAdminUser() {
  try {
    const existingAdmin = UserService.getAllUsers().find(u => u.email === 'daviskipper@gmail.com');
    
    if (!existingAdmin) {
      const adminUser = await UserService.registerUser(
        'daviskipper@gmail.com',
        '+1234567890',
        'FABONG123'
      );
      adminUser.role = 'SUPER_ADMIN';
      adminUser.verified = true;
      
      console.log('✅ Super Admin initialized: daviskipper@gmail.com');
    } else {
      console.log('✅ Super Admin already exists: daviskipper@gmail.com');
    }
  } catch (error) {
    console.error('⚠️ Failed to initialize admin user:', error.message);
  }
}

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  initializeAdminUser();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
