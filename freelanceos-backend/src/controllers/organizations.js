const Organization = require('../models/Organization');
const Project = require('../models/Project');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all organizations
// @route   GET /api/organizations
// @access  Public
exports.getOrganizations = asyncHandler(async (req, res) => {
  const { search, industry, page = 1, limit = 20 } = req.query;

  const query = {};

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }
  
  if (industry) {
    query.industry = industry;
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const startIndex = (pageNum - 1) * limitNum;

  const total = await Organization.countDocuments(query);
  const organizations = await Organization.find(query)
    .populate('industry', 'label value')
    .skip(startIndex)
    .limit(limitNum)
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: organizations,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum)
    }
  });
});

// @desc    Get single organization
// @route   GET /api/organizations/:id
// @access  Public
exports.getOrganization = asyncHandler(async (req, res) => {
  const organization = await Organization.findById(req.params.id)
    .populate('industry', 'label value');

  if (!organization) {
    return res.status(404).json({ success: false, message: 'Organization not found' });
  }

  res.status(200).json({
    success: true,
    data: organization
  });
});

// @desc    Create new organization
// @route   POST /api/organizations
// @access  Public
exports.createOrganization = asyncHandler(async (req, res) => {
  const organization = await Organization.create(req.body);

  res.status(201).json({
    success: true,
    data: organization
  });
});

// @desc    Update organization
// @route   PUT /api/organizations/:id
// @access  Public
exports.updateOrganization = asyncHandler(async (req, res) => {
  let organization = await Organization.findById(req.params.id);

  if (!organization) {
    return res.status(404).json({ success: false, message: 'Organization not found' });
  }

  // Update fields
  Object.assign(organization, req.body);
  await organization.save(); // This triggers basePlugin to set syncStatus dirty

  res.status(200).json({
    success: true,
    data: organization
  });
});

// @desc    Delete organization (soft delete)
// @route   DELETE /api/organizations/:id
// @access  Public
exports.deleteOrganization = asyncHandler(async (req, res) => {
  const organization = await Organization.findById(req.params.id);

  if (!organization) {
    return res.status(404).json({ success: false, message: 'Organization not found' });
  }

  await organization.softDelete();

  // Cascade soft delete to all projects
  const projects = await Project.find({ organizationId: organization._id });
  for (const project of projects) {
    await project.softDelete();
  }

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get organization summary
// @route   GET /api/organizations/:id/summary
// @access  Public
exports.getOrganizationSummary = asyncHandler(async (req, res) => {
  const organization = await Organization.findById(req.params.id)
    .populate('industry', 'label value');

  if (!organization) {
    return res.status(404).json({ success: false, message: 'Organization not found' });
  }

  const projects = await Project.find({ organizationId: organization._id })
    .populate('status', 'label value');

  // Calculate totals
  let calculatedTotalBilled = 0;
  let calculatedTotalReceived = 0;

  const projectSummaries = projects.map(p => {
    calculatedTotalBilled += p.totalPrice || 0;
    // Assuming totalReceived comes from an aggregation of payments in the future, 
    // but for now, we just rely on what is synced or we can add a logic. 
    // The requirement says "totalBilled, totalReceived, totalPending calculated".
    // If project doesn't track received yet, we default to 0.
    return {
      _id: p._id,
      name: p.name,
      status: p.status,
      totalPrice: p.totalPrice,
      totalReceived: 0 // Mocked for now until Payment endpoints are built
    };
  });

  const totalPending = calculatedTotalBilled - calculatedTotalReceived;

  res.status(200).json({
    success: true,
    data: {
      organization,
      projects: projectSummaries,
      financials: {
        totalBilled: calculatedTotalBilled,
        totalReceived: calculatedTotalReceived,
        totalPending
      }
    }
  });
});
