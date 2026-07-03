const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contactPerson: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  logo: {
    type: String // file path
  },
  industry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DropdownOption'
  },
  notes: {
    type: String
  },
  totalBilled: {
    type: Number,
    default: 0
  },
  totalReceived: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Organization', organizationSchema);
