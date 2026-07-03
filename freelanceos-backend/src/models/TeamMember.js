const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  skills: [{
    type: String
  }],
  notes: {
    type: String
  }
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
