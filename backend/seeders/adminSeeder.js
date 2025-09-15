const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const connectDB = require('../config/db'); // We'll create this file next

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Check if an admin already exists to prevent duplicates
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists. Seeding aborted.');
      return;
    }

    // Create a new admin user
    const newAdmin = new Admin({
      username: 'admin',
      password: 'password123', // Use a strong password in a real app
    });

    await newAdmin.save();
    console.log('Admin user seeded successfully!');
    process.exit();

  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();