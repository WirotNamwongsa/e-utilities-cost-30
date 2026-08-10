const { Expense, ExpenseCategory, BudgetCategory, User } = require('../models');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const expenseController = {
  getAll: async (req, res) => {
    try {
      const {
        month,
        year,
        expense_category_id,
        budget_category_id,
        page = 1,
        limit = 20
      } = req.query;

      const where = {};

      if (month) {
        where.billing_month = {
          [Op.like]: `%-${String(month).padStart(2, '0')}`
        };
      }

      if (year) {
        where.billing_month = {
          ...where.billing_month,
          [Op.like]: `${year}-%`
        };
      }

      if (expense_category_id) {
        where.expense_category_id = expense_category_id;
      }

      if (budget_category_id) {
        where.budget_category_id = budget_category_id;
      }

      const offset = (page - 1) * limit;

      const { count, rows } = await Expense.findAndCountAll({
        where,
        include: [
          {
            model: ExpenseCategory,
            as: 'expense_category',
            attributes: ['id', 'name', 'code']
          },
          {
            model: BudgetCategory,
            as: 'budget_category',
            attributes: ['id', 'name', 'code']
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'full_name']
          }
        ],
        order: [['billing_month', 'DESC'], ['created_at', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({
        data: rows,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(count / limit)
        }
      });
    } catch (error) {
      console.error('Get expenses error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  },

  getById: async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id, {
        include: [
          {
            model: ExpenseCategory,
            as: 'expense_category',
            attributes: ['id', 'name', 'code']
          },
          {
            model: BudgetCategory,
            as: 'budget_category',
            attributes: ['id', 'name', 'code']
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'full_name']
          }
        ]
      });

      if (!expense) {
        return res.status(404).json({ 
          error: { message: 'Expense not found', status: 404 } 
        });
      }

      res.json(expense);
    } catch (error) {
      console.error('Get expense error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  },

  create: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const expenseData = {
        ...req.body,
        created_by: req.user.id
      };

      const expense = await Expense.create(expenseData);
      
      // Fetch the created expense with associations
      const newExpense = await Expense.findByPk(expense.id, {
        include: [
          {
            model: ExpenseCategory,
            as: 'expense_category',
            attributes: ['id', 'name', 'code']
          },
          {
            model: BudgetCategory,
            as: 'budget_category',
            attributes: ['id', 'name', 'code']
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'full_name']
          }
        ]
      });

      res.status(201).json(newExpense);
    } catch (error) {
      console.error('Create expense error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  },

  update: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const expense = await Expense.findByPk(req.params.id);
      if (!expense) {
        return res.status(404).json({ 
          error: { message: 'Expense not found', status: 404 } 
        });
      }

      await expense.update(req.body);
      
      // Fetch the updated expense with associations
      const updatedExpense = await Expense.findByPk(expense.id, {
        include: [
          {
            model: ExpenseCategory,
            as: 'expense_category',
            attributes: ['id', 'name', 'code']
          },
          {
            model: BudgetCategory,
            as: 'budget_category',
            attributes: ['id', 'name', 'code']
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'username', 'full_name']
          }
        ]
      });

      res.json(updatedExpense);
    } catch (error) {
      console.error('Update expense error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  },

  delete: async (req, res) => {
    try {
      const expense = await Expense.findByPk(req.params.id);
      if (!expense) {
        return res.status(404).json({ 
          error: { message: 'Expense not found', status: 404 } 
        });
      }

      await expense.destroy();
      res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
      console.error('Delete expense error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  }
};

module.exports = expenseController;
