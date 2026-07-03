const app = require('../src/app');
const mongoose = require('mongoose');
const env = require('../src/config/env');
const seedDropdownOptions = require('../src/utils/seed');

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    if (mongoose.connection.readyState === 1) {
      isConnected = true;
    } else {
      try {
        console.log('Connecting to MongoDB (Serverless)...');
        await mongoose.connect(env.MONGODB_URI);
        await seedDropdownOptions();
        isConnected = true;
        console.log('Connected to MongoDB.');
      } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        return res.status(500).json({ success: false, message: 'Database connection failed' });
      }
    }
  }
  
  // Let Express handle the request
  return app(req, res);
};
