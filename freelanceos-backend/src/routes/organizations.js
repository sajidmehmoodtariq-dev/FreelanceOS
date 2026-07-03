const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const {
  getOrganizations,
  getOrganization,
  createOrganization,
  updateOrganization,
  deleteOrganization,
  getOrganizationSummary
} = require('../controllers/organizations');

const router = express.Router();

const orgValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .optional({ checkFalsy: true })
    .isEmail().withMessage('Must be a valid email'),
  body('phone')
    .optional({ checkFalsy: true })
    .matches(/^[0-9+\-() ]+$/).withMessage('Phone must contain only numbers and symbols')
];

router.route('/')
  .get(getOrganizations)
  .post(orgValidation, validate, createOrganization);

router.route('/:id')
  .get(getOrganization)
  .put(orgValidation, validate, updateOrganization)
  .delete(deleteOrganization);

router.get('/:id/summary', getOrganizationSummary);

module.exports = router;
