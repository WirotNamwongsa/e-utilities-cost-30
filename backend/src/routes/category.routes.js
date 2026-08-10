const express = require('express');
const router = express.Router();
const expenseCategoryController = require('../controllers/expenseCategory.controller');
const budgetCategoryController = require('../controllers/budgetCategory.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const { adminOnly } = require('../middlewares/auth.middleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Validation rules
const categoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 150 })
    .withMessage('Name must not exceed 150 characters'),
  body('code')
    .trim()
    .notEmpty()
    .withMessage('Code is required')
    .isLength({ max: 20 })
    .withMessage('Code must not exceed 20 characters')
    .matches(/^[A-Z0-9_]+$/)
    .withMessage('Code must contain only uppercase letters, numbers, and underscores')
];

const expenseCategoryValidation = [
  ...categoryValidation,
  body('unit')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Unit must not exceed 20 characters')
];

// Expense Categories routes
router.get('/expense-categories', expenseCategoryController.getAll);
router.get('/expense-categories/:id', expenseCategoryController.getById);
router.post('/expense-categories', adminOnly, expenseCategoryValidation, expenseCategoryController.create);
router.put('/expense-categories/:id', adminOnly, expenseCategoryValidation, expenseCategoryController.update);
router.delete('/expense-categories/:id', adminOnly, expenseCategoryController.delete);

// Budget Categories routes
router.get('/budget-categories', budgetCategoryController.getAll);
router.get('/budget-categories/:id', budgetCategoryController.getById);
router.post('/budget-categories', adminOnly, categoryValidation, budgetCategoryController.create);
router.put('/budget-categories/:id', adminOnly, categoryValidation, budgetCategoryController.update);
router.delete('/budget-categories/:id', adminOnly, budgetCategoryController.delete);

module.exports = router;
