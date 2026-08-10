const { Expense, ExpenseCategory, BudgetCategory } = require('../models');
const { Op, fn, col, literal } = require('sequelize');

const dashboardController = {
  getSummary: async (req, res) => {
    try {
      const { year } = req.query;
      const currentYear = year || new Date().getFullYear();

      // Get current month and previous month
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYearActual = currentDate.getFullYear();
      
      const previousMonthDate = new Date(currentDate);
      previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
      const previousMonth = previousMonthDate.getMonth() + 1;
      const previousYear = previousMonthDate.getFullYear();

      // Current month total
      const currentMonthTotal = await Expense.sum('amount', {
        where: {
          billing_month: {
            [Op.like]: `${currentYearActual}-${String(currentMonth).padStart(2, '0')}-%`
          }
        }
      }) || 0;

      // Previous month total
      const previousMonthTotal = await Expense.sum('amount', {
        where: {
          billing_month: {
            [Op.like]: `${previousYear}-${String(previousMonth).padStart(2, '0')}-%`
          }
        }
      }) || 0;

      // Year to date total
      const yearToDateTotal = await Expense.sum('amount', {
        where: {
          billing_month: {
            [Op.like]: `${currentYearActual}-%`
          }
        }
      }) || 0;

      // Calculate percentage change
      let percentageChange = 0;
      if (previousMonthTotal > 0) {
        percentageChange = ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
      }

      // Monthly breakdown for the selected year
      const monthlyBreakdown = await Expense.findAll({
        attributes: [
          [fn('DATE_FORMAT', col('billing_month'), '%Y-%m'), 'month'],
          [fn('SUM', col('amount')), 'total']
        ],
        where: {
          billing_month: {
            [Op.like]: `${currentYear}-%`
          }
        },
        group: [fn('DATE_FORMAT', col('billing_month'), '%Y-%m')],
        order: [[fn('DATE_FORMAT', col('billing_month'), '%Y-%m'), 'ASC']],
        raw: true
      });

      res.json({
        currentMonth: {
          total: parseFloat(currentMonthTotal),
          month: currentMonth,
          year: currentYearActual
        },
        previousMonth: {
          total: parseFloat(previousMonthTotal),
          month: previousMonth,
          year: previousYear
        },
        yearToDate: {
          total: parseFloat(yearToDateTotal),
          year: currentYearActual
        },
        percentageChange: parseFloat(percentageChange.toFixed(2)),
        monthlyBreakdown: monthlyBreakdown.map(item => ({
          month: item.month,
          total: parseFloat(item.total)
        }))
      });
    } catch (error) {
      console.error('Get dashboard summary error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  },

  getByCategory: async (req, res) => {
    try {
      const { year } = req.query;
      const currentYear = year || new Date().getFullYear();

      const categoryBreakdown = await Expense.findAll({
        attributes: [
          'expense_category_id',
          [fn('SUM', col('amount')), 'total']
        ],
        include: [
          {
            model: ExpenseCategory,
            as: 'expense_category',
            attributes: ['id', 'name', 'code']
          }
        ],
        where: {
          billing_month: {
            [Op.like]: `${currentYear}-%`
          }
        },
        group: ['expense_category_id', 'expense_category.id'],
        order: [[fn('SUM', col('amount')), 'DESC']],
        raw: false
      });

      res.json({
        year: parseInt(currentYear),
        data: categoryBreakdown.map(item => ({
          category: item.expense_category,
          total: parseFloat(item.dataValues.total)
        }))
      });
    } catch (error) {
      console.error('Get by category error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  },

  getByBudget: async (req, res) => {
    try {
      const { year } = req.query;
      const currentYear = year || new Date().getFullYear();

      const budgetBreakdown = await Expense.findAll({
        attributes: [
          'budget_category_id',
          [fn('SUM', col('amount')), 'total']
        ],
        include: [
          {
            model: BudgetCategory,
            as: 'budget_category',
            attributes: ['id', 'name', 'code']
          }
        ],
        where: {
          billing_month: {
            [Op.like]: `${currentYear}-%`
          }
        },
        group: ['budget_category_id', 'budget_category.id'],
        order: [[fn('SUM', col('amount')), 'DESC']],
        raw: false
      });

      res.json({
        year: parseInt(currentYear),
        data: budgetBreakdown.map(item => ({
          category: item.budget_category,
          total: parseFloat(item.dataValues.total)
        }))
      });
    } catch (error) {
      console.error('Get by budget error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  },

  compareYears: async (req, res) => {
    try {
      const { year1, year2 } = req.query;
      
      if (!year1 || !year2) {
        return res.status(400).json({ 
          error: { message: 'Both year1 and year2 are required', status: 400 } 
        });
      }

      const getYearData = async (year) => {
        const monthlyData = await Expense.findAll({
          attributes: [
            [fn('DATE_FORMAT', col('billing_month'), '%Y-%m'), 'month'],
            [fn('SUM', col('amount')), 'total']
          ],
          where: {
            billing_month: {
              [Op.like]: `${year}-%`
            }
          },
          group: [fn('DATE_FORMAT', col('billing_month'), '%Y-%m')],
          order: [[fn('DATE_FORMAT', col('billing_month'), '%Y-%m'), 'ASC']],
          raw: true
        });

        const total = await Expense.sum('amount', {
          where: {
            billing_month: {
              [Op.like]: `${year}-%`
            }
          }
        }) || 0;

        return {
          year: parseInt(year),
          total: parseFloat(total),
          monthlyData: monthlyData.map(item => ({
            month: item.month,
            total: parseFloat(item.total)
          }))
        };
      };

      const [year1Data, year2Data] = await Promise.all([
        getYearData(year1),
        getYearData(year2)
      ]);

      res.json({
        year1: year1Data,
        year2: year2Data,
        percentageChange: year2Data.total > 0 
          ? parseFloat(((year1Data.total - year2Data.total) / year2Data.total * 100).toFixed(2))
          : 0
      });
    } catch (error) {
      console.error('Compare years error:', error);
      res.status(500).json({ 
        error: { message: 'Internal server error', status: 500 } 
      });
    }
  }
};

module.exports = dashboardController;
