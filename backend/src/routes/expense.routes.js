const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Validation rules
const expenseValidation = [
  body('expense_category_id')
    .notEmpty()
    .withMessage('Expense category is required')
    .isInt()
    .withMessage('Expense category must be an integer'),
  body('budget_category_id')
    .notEmpty()
    .withMessage('Budget category is required')
    .isInt()
    .withMessage('Budget category must be an integer'),
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('billing_month')
    .notEmpty()
    .withMessage('Billing month is required')
    .isISO8601()
    .withMessage('Billing month must be a valid date (YYYY-MM-DD)'),
  body('paid_date')
    .optional()
    .isISO8601()
    .withMessage('Paid date must be a valid date (YYYY-MM-DD)'),
  body('invoice_no')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Invoice number must not exceed 50 characters'),
  body('note')
    .optional()
    .isLength({ max: 1000 })
    .withMessage('Note must not exceed 1000 characters')
];

// Routes
router.get('/', expenseController.getAll);
router.get('/:id', expenseController.getById);
router.post('/', expenseValidation, expenseController.create);
router.put('/:id', expenseValidation, expenseController.update);
router.delete('/:id', expenseController.delete);

module.exports = router;
