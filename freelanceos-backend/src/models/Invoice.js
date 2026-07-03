const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  projectIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  phaseIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Phase'
  }],
  lineItems: [{
    description: String,
    quantity: Number,
    unitPrice: Number,
    total: Number
  }],
  subtotal: {
    type: Number
  },
  tax: {
    type: Number,
    default: 0
  },
  total: {
    type: Number
  },
  notes: {
    type: String
  },
  paymentTerms: {
    type: String
  },
  dueDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['draft', 'sent', 'paid']
  },
  pdfPath: {
    type: String
  }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
