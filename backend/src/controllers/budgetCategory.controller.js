const { BudgetCategory } = require('../models');
const { validationResult } = require('express-validator');

const budgetCategoryController = {
  getAll: async (req, res) => {
    try {
      const categories = await BudgetCategory.findAll({
        where: { is_active: true },
        order: [['name', 'ASC']]
      });
      res.json(categories);
    } catch (error) {
      console.error('Get budget categories error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  },

  getById: async (req, res) => {
    try {
      const category = await BudgetCategory.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ 
          error: { message: 'Budget category not found', status: 404 } 
        });
      }
      res.json(category);
    } catch (error) {
      console.error('Get budget category error:', error);
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

      const category = await BudgetCategory.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      console.error('Create budget category error:', error);
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

      const category = await BudgetCategory.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ 
          error: { message: 'Budget category not found', status: 404 } 
        });
      }

      await category.update(req.body);
      res.json(category);
    } catch (error) {
      console.error('Update budget category error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  },

  delete: async (req, res) => {
    try {
      const category = await BudgetCategory.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ 
          error: { message: 'Budget category not found', status: 404 } 
        });
      }

      // Soft delete
      await category.update({ is_active: false });
      res.json({ message: 'Budget category deleted successfully' });
    } catch (error) {
      console.error('Delete budget category error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  }
};

module.exports = budgetCategoryController;
