const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Expense = db.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  expense_category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'expense_categories',
      key: 'id'
    }
  },
  budget_category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'budget_categories',
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  billing_month: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: 'First day of the billing month'
  },
  paid_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  invoice_no: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  attachment_path: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  tableName: 'expenses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Expense;
