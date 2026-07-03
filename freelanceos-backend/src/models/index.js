const mongoose = require('mongoose');
const basePlugin = require('./plugins/basePlugin');

// Apply base fields and soft delete to all models globally BEFORE they are compiled
mongoose.plugin(basePlugin);

const Organization = require('./Organization');
const Project = require('./Project');
const Phase = require('./Phase');
const Payment = require('./Payment');
const Document = require('./Document');
const TeamMember = require('./TeamMember');
const ProjectAssignment = require('./ProjectAssignment');
const Invoice = require('./Invoice');
const DropdownOption = require('./DropdownOption');
const SyncLog = require('./SyncLog');

module.exports = {
  Organization,
  Project,
  Phase,
  Payment,
  Document,
  TeamMember,
  ProjectAssignment,
  Invoice,
  DropdownOption,
  SyncLog
};
