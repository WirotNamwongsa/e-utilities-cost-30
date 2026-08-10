const bcrypt = require('bcryptjs');
const { User, ExpenseCategory, BudgetCategory } = require('../models');

const seedData = async () => {
  try {
    console.log('Starting database seeding...');

    // Create default admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const [admin] = await User.findOrCreate({
      where: { username: 'admin' },
      defaults: {
        username: 'admin',
        password: hashedPassword,
        full_name: 'System Administrator',
        role: 'admin'
      }
    });
    console.log('Admin user created or already exists');

    // Create expense categories
    const expenseCategories = [
      { name: 'ค่าไฟฟ้า', code: 'ELEC', unit: 'บาท' },
      { name: 'ค่าพลังงาน', code: 'ENERGY', unit: 'บาท' },
      { name: 'ค่าน้ำประปา', code: 'WATER', unit: 'บาท' },
      { name: 'ค่าอินเทอร์เน็ต', code: 'INTERNET', unit: 'บาท' },
      { name: 'ค่าโทรศัพท์', code: 'PHONE', unit: 'บาท' },
      { name: 'ค่าไปรษณีย์', code: 'POST', unit: 'บาท' },
      { name: 'ค่าทิ้งขยะ', code: 'WASTE', unit: 'บาท' }
    ];

    for (const category of expenseCategories) {
      await ExpenseCategory.findOrCreate({
        where: { code: category.code },
        defaults: category
      });
    }
    console.log('Expense categories seeded successfully');

    // Create budget categories
    const budgetCategories = [
      { name: 'งบประมาณ (ปวช.)', code: 'BUDGET_VOC' },
      { name: 'งบประมาณ (ปวส.)', code: 'BUDGET_HIGHER' },
      { name: 'เงินรายได้สถานศึกษา', code: 'INCOME' }
    ];

    for (const category of budgetCategories) {
      await BudgetCategory.findOrCreate({
        where: { code: category.code },
        defaults: category
      });
    }
    console.log('Budget categories seeded successfully');

    console.log('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
