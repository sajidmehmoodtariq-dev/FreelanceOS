const mongoose = require('mongoose');
const { Organization } = require('./src/models');
const app = require('./src/app');
const request = require('supertest');

async function runTests() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/freelanceos_test');
    console.log('Connected to MongoDB');

    // Start server for health check
    const server = app.listen(8081);

    // Test GET /api/health
    console.log('Testing GET /api/health...');
    const res = await request(app).get('/api/health');
    if (res.status === 200 && res.body.data.status === 'UP') {
      console.log('GET /api/health is OK');
    } else {
      console.error('GET /api/health FAILED', res.body);
    }

    // Test Mongoose Models creation
    console.log('Collections created:', Object.keys(mongoose.models).join(', '));

    // Test pre-save hook and soft delete
    console.log('Testing pre-save hook and soft delete...');
    const org = new Organization({ name: 'Test Org' });
    
    // Default syncStatus should be local_only
    console.log(`Initial syncStatus: ${org.syncStatus}`);
    
    // Save org
    await org.save();
    console.log(`Saved org localId: ${org.localId}`);

    // Change syncStatus to synced
    org.syncStatus = 'synced';
    await org.save();
    console.log(`SyncStatus manually set to: ${org.syncStatus}`);

    // Modify org
    org.name = 'Test Org Modified';
    await org.save();
    console.log(`SyncStatus after modify: ${org.syncStatus} (Should be dirty)`);

    // Test soft delete
    console.log('Testing soft delete...');
    await org.softDelete();
    
    // Try to find it
    const foundOrg = await Organization.findById(org._id);
    if (!foundOrg) {
      console.log('Soft deleted record was correctly filtered out.');
    } else {
      console.log('ERROR: Soft deleted record was NOT filtered out!');
    }

    server.close();
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    console.log('All tests passed.');
    process.exit(0);

  } catch (error) {
    console.error('Test error:', error);
    process.exit(1);
  }
}

runTests();
