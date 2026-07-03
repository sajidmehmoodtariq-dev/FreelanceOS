const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DropdownOption'
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DropdownOption'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  ourShare: {
    type: Number // percentage
  },
  partnerShare: {
    type: Number // percentage
  },
  agreedDeadline: {
    type: Date
  },
  actualCompletion: {
    type: Date
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DropdownOption'
  }],
  notes: {
    type: String
  },
  extractedFeatures: [{
    text: String,
    type: String,
    priority: String,
    ambiguous: Boolean,
    done: {
      type: Boolean,
      default: false
    }
  }],
  totalHiredCost: {
    type: Number,
    default: 0
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

projectSchema.virtual('profit').get(function() {
  return this.totalPrice - (this.totalHiredCost || 0);
});

projectSchema.virtual('pipelineValue').get(function() {
  // Can be refined later based on requirements
  return this.totalPrice;
});

module.exports = mongoose.model('Project', projectSchema);
