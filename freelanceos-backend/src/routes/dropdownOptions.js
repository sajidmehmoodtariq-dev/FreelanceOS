const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const {
  getOptions,
  createOption,
  updateOption,
  deleteOption,
  reorderOptions,
  seedOptions
} = require('../controllers/dropdownOptions');

const router = express.Router();

router.get('/', getOptions);

router.post(
  '/',
  [
    body('category').notEmpty().withMessage('Category is required'),
    body('label').notEmpty().withMessage('Label is required')
  ],
  validate,
  createOption
);

router.post('/reorder', reorderOptions);
router.post('/seed', seedOptions);

router.route('/:id')
  .put(updateOption)
  .delete(deleteOption);

module.exports = router;
