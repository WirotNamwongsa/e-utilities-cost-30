const { DataTypes } = require('sequelize');
const db = require('../config/db');

const BudgetCategory = db.define('BudgetCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true
  },
  code: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'budget_categories',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = BudgetCategory;
