const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileType: {
    type: String
  },
  size: {
    type: Number
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DropdownOption'
  },
  parentType: {
    type: String,
    enum: ['organization', 'project', 'phase']
  },
  parentId: {
    type: String
  },
  extractionStatus: {
    type: String,
    enum: ['pending', 'processing', 'done', 'failed'],
    default: 'pending'
  },
  extractedData: {
    type: mongoose.Schema.Types.Mixed
  }
});

module.exports = mongoose.model('Document', documentSchema);
