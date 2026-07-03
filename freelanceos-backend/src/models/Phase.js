const mongoose = require('mongoose');

const phaseSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  orderIndex: {
    type: Number
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DropdownOption'
  },
  priceIncrement: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  completionPercent: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
});

module.exports = mongoose.model('Phase', phaseSchema);
