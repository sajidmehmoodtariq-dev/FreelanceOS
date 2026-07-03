const { generateUUID } = require('../../utils/uuid');
const { SyncStatus } = require('../../utils/syncStatus');

module.exports = function basePlugin(schema, options) {
  // Add base fields
  schema.add({
    localId: {
      type: String,
      required: true,
      unique: true,
      default: generateUUID
    },
    syncStatus: {
      type: String,
      enum: [SyncStatus.LOCAL_ONLY, SyncStatus.SYNCED, SyncStatus.DIRTY, SyncStatus.CONFLICT],
      default: SyncStatus.LOCAL_ONLY
    },
    deletedAt: {
      type: Date,
      default: null
    }
  });

  // createdAt and updatedAt are typically handled by Mongoose timestamps option
  // Ensure timestamps are enabled
  schema.set('timestamps', true);

  // Pre-save hook for sync status
  schema.pre('save', function (next) {
    if (this.isModified() && this.syncStatus === SyncStatus.SYNCED) {
      this.syncStatus = SyncStatus.DIRTY;
    }
    if (typeof next === 'function') next();
  });

  // Soft delete query middlewares
  const excludeDeleted = function (next) {
    // Only filter if the query doesn't explicitly look for deleted items
    if (this.getQuery().deletedAt === undefined) {
      this.where({ deletedAt: null });
    }
    if (typeof next === 'function') next();
  };

  schema.pre('find', excludeDeleted);
  schema.pre('findOne', excludeDeleted);
  schema.pre('findOneAndUpdate', excludeDeleted);
  schema.pre('countDocuments', excludeDeleted);

  // Allow a method to soft delete
  schema.methods.softDelete = function () {
    this.deletedAt = new Date();
    // Setting syncStatus to dirty so the deletion syncs
    if (this.syncStatus === SyncStatus.SYNCED) {
      this.syncStatus = SyncStatus.DIRTY;
    }
    return this.save();
  };
};
