const { Expense, ExpenseCategory, BudgetCategory, User } = require('../models');

const seedExpenses = async () => {
  try {
    console.log('Seeding sample expenses...');

    const admin = await User.findOne({ where: { username: 'admin' } });
    if (!admin) throw new Error('Admin user not found — run base seeder first');

    const categories = await ExpenseCategory.findAll();
    const budgets = await BudgetCategory.findAll();

    if (!categories.length || !budgets.length) {
      throw new Error('Expense/Budget categories not found — run base seeder first');
    }

    const sample = [
      { amount: 1250.5, billing_month: '2026-01-01', expense_category_id: categories[0].id, budget_category_id: budgets[0].id },
      { amount: 980.0, billing_month: '2026-02-01', expense_category_id: categories[1]?.id || categories[0].id, budget_category_id: budgets[1]?.id || budgets[0].id },
      { amount: 1520.75, billing_month: '2026-03-01', expense_category_id: categories[2]?.id || categories[0].id, budget_category_id: budgets[0].id },
      { amount: 800.0, billing_month: '2026-03-01', expense_category_id: categories[3]?.id || categories[0].id, budget_category_id: budgets[2]?.id || budgets[0].id },
      { amount: 430.25, billing_month: '2026-04-01', expense_category_id: categories[0].id, budget_category_id: budgets[2].id }
    ];

    for (const item of sample) {
      await Expense.create({
        expense_category_id: item.expense_category_id,
        budget_category_id: item.budget_category_id,
        amount: item.amount,
        billing_month: item.billing_month,
        created_by: admin.id
      });
    }

    console.log('Sample expenses seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed expenses:', error.message || error);
    process.exit(1);
  }
};

seedExpenses();
