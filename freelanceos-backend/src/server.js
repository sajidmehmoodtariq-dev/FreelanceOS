const app = require('./app');
const connectDB = require('./config/db');
const env = require('./config/env');

// Require models to ensure they are registered
require('./models');

// Connect to database
connectDB().then(() => {
  // Start server
  const server = app.listen(env.PORT, () => {
    console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
    console.error(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
});
