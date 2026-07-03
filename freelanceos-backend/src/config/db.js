const mongoose = require('mongoose');
const env = require('./env');
const seedDropdownOptions = require('../utils/seed');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Seed default dropdown options on connection
    await seedDropdownOptions();
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
