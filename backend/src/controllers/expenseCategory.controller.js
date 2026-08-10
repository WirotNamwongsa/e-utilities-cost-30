const { ExpenseCategory } = require('../models');
const { validationResult } = require('express-validator');

const expenseCategoryController = {
  getAll: async (req, res) => {
    try {
      const categories = await ExpenseCategory.findAll({
        where: { is_active: true },
        order: [['name', 'ASC']]
      });
      res.json(categories);
    } catch (error) {
      console.error('Get expense categories error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  },

  getById: async (req, res) => {
    try {
      const category = await ExpenseCategory.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ 
          error: { message: 'Expense category not found', status: 404 } 
        });
      }
      res.json(category);
    } catch (error) {
      console.error('Get expense category error:', error);
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

      const category = await ExpenseCategory.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      console.error('Create expense category error:', error);
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

      const category = await ExpenseCategory.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ 
          error: { message: 'Expense category not found', status: 404 } 
        });
      }

      await category.update(req.body);
      res.json(category);
    } catch (error) {
      console.error('Update expense category error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  },

  delete: async (req, res) => {
    try {
      const category = await ExpenseCategory.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ 
          error: { message: 'Expense category not found', status: 404 } 
        });
      }

      // Soft delete
      await category.update({ is_active: false });
      res.json({ message: 'Expense category deleted successfully' });
    } catch (error) {
      console.error('Delete expense category error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  }
};

module.exports = expenseCategoryController;
