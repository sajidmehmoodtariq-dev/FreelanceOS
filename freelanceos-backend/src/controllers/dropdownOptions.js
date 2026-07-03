const DropdownOption = require('../models/DropdownOption');
const asyncHandler = require('../middleware/asyncHandler');
const seedDropdownOptions = require('../utils/seed');

// Helper to generate slug
const generateSlug = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '_')           // Replace spaces with _
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '_')         // Replace multiple - with single _
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

// @desc    Get dropdown options by category
// @route   GET /api/dropdown-options
// @access  Public
exports.getOptions = asyncHandler(async (req, res) => {
  const { category } = req.query;
  
  if (!category) {
    return res.status(400).json({ success: false, message: 'Category is required' });
  }

  const options = await DropdownOption.find({ category }).sort({ orderIndex: 1 });
  
  res.status(200).json({
    success: true,
    data: options
  });
});

// @desc    Create new dropdown option
// @route   POST /api/dropdown-options
// @access  Public
exports.createOption = asyncHandler(async (req, res) => {
  const { category, label, value, isDefault, orderIndex } = req.body;

  const newOption = new DropdownOption({
    category,
    label,
    value: value || generateSlug(label),
    isDefault: isDefault || false,
    orderIndex: orderIndex || 0
  });

  await newOption.save();

  res.status(201).json({
    success: true,
    data: newOption
  });
});

// @desc    Update dropdown option
// @route   PUT /api/dropdown-options/:id
// @access  Public
exports.updateOption = asyncHandler(async (req, res) => {
  const { label, orderIndex, isDefault } = req.body;

  const option = await DropdownOption.findById(req.params.id);

  if (!option) {
    return res.status(404).json({ success: false, message: 'Dropdown option not found' });
  }

  if (label !== undefined) option.label = label;
  if (orderIndex !== undefined) option.orderIndex = orderIndex;
  if (isDefault !== undefined) option.isDefault = isDefault;

  await option.save();

  res.status(200).json({
    success: true,
    data: option
  });
});

// @desc    Soft delete dropdown option
// @route   DELETE /api/dropdown-options/:id
// @access  Public
exports.deleteOption = asyncHandler(async (req, res) => {
  const option = await DropdownOption.findById(req.params.id);

  if (!option) {
    return res.status(404).json({ success: false, message: 'Dropdown option not found' });
  }

  await option.softDelete();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Bulk reorder dropdown options
// @route   POST /api/dropdown-options/reorder
// @access  Public
exports.reorderOptions = asyncHandler(async (req, res) => {
  const updates = req.body; // Expects [{ id, orderIndex }]

  if (!Array.isArray(updates)) {
    return res.status(400).json({ success: false, message: 'Body must be an array of updates' });
  }

  const bulkOps = updates.map(update => ({
    updateOne: {
      filter: { _id: update.id },
      update: { orderIndex: update.orderIndex }
    }
  }));

  await DropdownOption.bulkWrite(bulkOps);

  res.status(200).json({
    success: true,
    message: 'Reordered successfully'
  });
});

// @desc    Resets and reseeds defaults
// @route   POST /api/dropdown-options/seed
// @access  Public (Dev only ideally)
exports.seedOptions = asyncHandler(async (req, res) => {
  await seedDropdownOptions(true); // forceWipe = true

  res.status(200).json({
    success: true,
    message: 'Dropdown options reseeded successfully'
  });
});
