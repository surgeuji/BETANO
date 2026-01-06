/**
 * Create Admin User Script
 * Run this script to initialize the admin user in the system
 * 
 * Usage: node src/scripts/createAdmin.js
 */

const UserService = require('../services/UserService');

async function createAdminUser() {
  try {
    console.log('🚀 Creating Super Admin user...');

    const adminUser = await UserService.registerUser(
      'daviskipper@gmail.com',
      '+1234567890', // Default phone for admin
      'FABONG123'
    );

    // Set role to SUPER_ADMIN
    adminUser.role = 'SUPER_ADMIN';
    adminUser.verified = true;

    console.log('✅ Super Admin user created successfully!');
    console.log('📧 Email: daviskipper@gmail.com');
    console.log('🔐 Password: FABONG123');
    console.log('👤 Role: SUPER_ADMIN');
    console.log('🆔 User ID:', adminUser.id);
    console.log('\n✨ You can now login to the admin dashboard with these credentials.');

    // Show all users in system
    const allUsers = UserService.getAllUsers();
    console.log('\n📋 Total users in system:', allUsers.length);
    allUsers.forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.email} - Role: ${user.role}`);
    });

  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
}

createAdminUser();
