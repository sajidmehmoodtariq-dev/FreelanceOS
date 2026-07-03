const DropdownOption = require('../models/DropdownOption');

const defaultOptions = [
  { category: 'project_type', label: 'Web Development', value: 'web_dev', isDefault: true, orderIndex: 1 },
  { category: 'project_type', label: 'Mobile App', value: 'mobile_app', isDefault: true, orderIndex: 2 },
  { category: 'project_type', label: 'Design', value: 'design', isDefault: true, orderIndex: 3 },
  { category: 'project_status', label: 'Lead', value: 'lead', isDefault: true, orderIndex: 1 },
  { category: 'project_status', label: 'In Progress', value: 'in_progress', isDefault: true, orderIndex: 2 },
  { category: 'project_status', label: 'Completed', value: 'completed', isDefault: true, orderIndex: 3 },
  { category: 'industry', label: 'Technology', value: 'technology', isDefault: true, orderIndex: 1 },
  { category: 'industry', label: 'Healthcare', value: 'healthcare', isDefault: true, orderIndex: 2 },
  { category: 'payment_method', label: 'Bank Transfer', value: 'bank_transfer', isDefault: true, orderIndex: 1 },
  { category: 'payment_method', label: 'Credit Card', value: 'credit_card', isDefault: true, orderIndex: 2 },
  { category: 'document_tag', label: 'Contract', value: 'contract', isDefault: true, orderIndex: 1 },
  { category: 'document_tag', label: 'Invoice', value: 'invoice', isDefault: true, orderIndex: 2 },
  { category: 'document_tag', label: 'Brief', value: 'brief', isDefault: true, orderIndex: 3 }
];

const seedDropdownOptions = async () => {
  try {
    const count = await DropdownOption.countDocuments();
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
