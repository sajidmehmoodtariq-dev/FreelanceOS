const DropdownOption = require('../models/DropdownOption');

const defaultOptions = [
  // project_type
  { category: 'project_type', label: 'Website', value: 'website', isDefault: true, orderIndex: 1 },
  { category: 'project_type', label: 'Mobile App', value: 'mobile_app', isDefault: true, orderIndex: 2 },
  { category: 'project_type', label: 'Python Automation', value: 'python_automation', isDefault: true, orderIndex: 3 },
  { category: 'project_type', label: 'Deployment', value: 'deployment', isDefault: true, orderIndex: 4 },
  { category: 'project_type', label: 'UI/UX Design', value: 'ui_ux_design', isDefault: true, orderIndex: 5 },
  { category: 'project_type', label: 'API Integration', value: 'api_integration', isDefault: true, orderIndex: 6 },
  { category: 'project_type', label: 'Other', value: 'other', isDefault: true, orderIndex: 7 },
  
  // project_status
  { category: 'project_status', label: 'Lead', value: 'lead', isDefault: true, orderIndex: 1 },
  { category: 'project_status', label: 'Active', value: 'active', isDefault: true, orderIndex: 2 },
  { category: 'project_status', label: 'On Hold', value: 'on_hold', isDefault: true, orderIndex: 3 },
  { category: 'project_status', label: 'Completed', value: 'completed', isDefault: true, orderIndex: 4 },
  { category: 'project_status', label: 'Cancelled', value: 'cancelled', isDefault: true, orderIndex: 5 },

  // industry
  { category: 'industry', label: 'Technology', value: 'technology', isDefault: true, orderIndex: 1 },
  { category: 'industry', label: 'E-Commerce', value: 'ecommerce', isDefault: true, orderIndex: 2 },
  { category: 'industry', label: 'Education', value: 'education', isDefault: true, orderIndex: 3 },
  { category: 'industry', label: 'Healthcare', value: 'healthcare', isDefault: true, orderIndex: 4 },
  { category: 'industry', label: 'Finance', value: 'finance', isDefault: true, orderIndex: 5 },
  { category: 'industry', label: 'Real Estate', value: 'real_estate', isDefault: true, orderIndex: 6 },
  { category: 'industry', label: 'Other', value: 'other', isDefault: true, orderIndex: 7 },

  // payment_method
  { category: 'payment_method', label: 'Bank Transfer', value: 'bank_transfer', isDefault: true, orderIndex: 1 },
  { category: 'payment_method', label: 'Cash', value: 'cash', isDefault: true, orderIndex: 2 },
  { category: 'payment_method', label: 'JazzCash', value: 'jazzcash', isDefault: true, orderIndex: 3 },
  { category: 'payment_method', label: 'EasyPaisa', value: 'easypaisa', isDefault: true, orderIndex: 4 },
  { category: 'payment_method', label: 'PayPal', value: 'paypal', isDefault: true, orderIndex: 5 },
  { category: 'payment_method', label: 'Wise', value: 'wise', isDefault: true, orderIndex: 6 },
  { category: 'payment_method', label: 'Other', value: 'other', isDefault: true, orderIndex: 7 },

  // document_tag
  { category: 'document_tag', label: 'Brief', value: 'brief', isDefault: true, orderIndex: 1 },
  { category: 'document_tag', label: 'Contract', value: 'contract', isDefault: true, orderIndex: 2 },
  { category: 'document_tag', label: 'Design', value: 'design', isDefault: true, orderIndex: 3 },
  { category: 'document_tag', label: 'Requirements', value: 'requirements', isDefault: true, orderIndex: 4 },
  { category: 'document_tag', label: 'Invoice', value: 'invoice', isDefault: true, orderIndex: 5 },
  { category: 'document_tag', label: 'Misc', value: 'misc', isDefault: true, orderIndex: 6 },

  // phase_status
  { category: 'phase_status', label: 'Not Started', value: 'not_started', isDefault: true, orderIndex: 1 },
  { category: 'phase_status', label: 'In Progress', value: 'in_progress', isDefault: true, orderIndex: 2 },
  { category: 'phase_status', label: 'Review', value: 'review', isDefault: true, orderIndex: 3 },
  { category: 'phase_status', label: 'Completed', value: 'completed', isDefault: true, orderIndex: 4 }
];

const seedDropdownOptions = async (forceWipe = false) => {
  try {
    if (forceWipe) {
      console.log('Force wiping existing default dropdown options...');
      await DropdownOption.deleteMany({ isDefault: true });
    }

    const count = await DropdownOption.countDocuments({ isDefault: true });
    if (count === 0) {
      console.log('Seeding default dropdown options...');
      await DropdownOption.insertMany(defaultOptions);
      console.log('Default dropdown options seeded successfully.');
    }
  } catch (error) {
    console.error('Error seeding dropdown options:', error);
  }
};

module.exports = seedDropdownOptions;
