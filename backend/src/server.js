const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 3000;

// Test database connection and start server
db.authenticate()
  .then(() => {
    console.log('Database connection established successfully');
    return db.sync({ alter: true }); // Sync database models
  })
  .then(() => {
    console.log('Database models synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });
