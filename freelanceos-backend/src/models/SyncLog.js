const mongoose = require('mongoose');

const syncLogSchema = new mongoose.Schema({
  recordType: {
    type: String
  },
  // using String to reference localId instead of ObjectId because localId is UUID
  refLocalId: {
    type: String
  },
  action: {
    type: String,
    enum: ['push', 'pull', 'conflict']
  },
  status: {
    type: String,
    enum: ['success', 'failed']
  },
  error: {
    type: String
  },
  syncedAt: {
    type: Date
  }
});

module.exports = mongoose.model('SyncLog', syncLogSchema);
