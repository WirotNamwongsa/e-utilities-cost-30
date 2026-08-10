const { DataTypes } = require('sequelize');
const db = require('../config/db');

const ExpenseCategory = db.define('ExpenseCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  unit: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: 'บาท'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'expense_categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = ExpenseCategory;
