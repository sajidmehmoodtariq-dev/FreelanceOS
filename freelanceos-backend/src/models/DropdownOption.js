const mongoose = require('mongoose');

const dropdownOptionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  orderIndex: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('DropdownOption', dropdownOptionSchema);
