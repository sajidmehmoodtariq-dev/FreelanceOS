const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['project', 'organization'],
    required: true
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: function() {
      return this.type === 'project';
    }
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  method: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DropdownOption'
  },
  reference: {
    type: String
  },
  notes: {
    type: String
  },
  distributionType: {
    type: String,
    enum: ['auto', 'manual'],
    default: 'auto'
  },
  distributions: [{
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    amount: {
      type: Number
    }
  }]
});

module.exports = mongoose.model('Payment', paymentSchema);
