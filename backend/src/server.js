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

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
