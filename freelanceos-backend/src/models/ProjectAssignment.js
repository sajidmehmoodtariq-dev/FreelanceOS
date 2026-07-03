const mongoose = require('mongoose');

const projectAssignmentSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  teamMemberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeamMember'
  },
  role: {
    type: String
  },
  agreedAmount: {
    type: Number
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'partial', 'paid'],
    default: 'unpaid'
  }
});

module.exports = mongoose.model('ProjectAssignment', projectAssignmentSchema);
