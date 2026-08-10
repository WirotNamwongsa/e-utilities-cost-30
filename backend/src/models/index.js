const db = require('../config/db');
const User = require('./user.model');
const ExpenseCategory = require('./expenseCategory.model');
const BudgetCategory = require('./budgetCategory.model');
const Expense = require('./expense.model');

// Define associations
User.hasMany(Expense, {
  foreignKey: 'created_by',
  as: 'expenses'
});
Expense.belongsTo(User, {
  foreignKey: 'created_by',
  as: 'creator'
});

ExpenseCategory.hasMany(Expense, {
  foreignKey: 'expense_category_id',
  as: 'expenses'
});
Expense.belongsTo(ExpenseCategory, {
  foreignKey: 'expense_category_id',
  as: 'expense_category'
});

BudgetCategory.hasMany(Expense, {
  foreignKey: 'budget_category_id',
  as: 'expenses'
});
Expense.belongsTo(BudgetCategory, {
  foreignKey: 'budget_category_id',
  as: 'budget_category'
});

module.exports = {
  db,
  User,
  ExpenseCategory,
  BudgetCategory,
  Expense
};
