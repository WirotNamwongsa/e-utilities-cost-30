const app = require('./app');
const db = require('./config/db');

const PORT = process.env.PORT || 3000;
const MAX_RETRIES = 10;
const RETRY_DELAY = 5000; // 5 seconds

async function connectWithRetry(retryCount = 0) {
  try {
    console.log(`Attempting database connection (attempt ${retryCount + 1}/${MAX_RETRIES})...`);
    await db.authenticate();
    console.log('Database connection established successfully');
    
    await db.sync({ alter: true }); // Sync database models
    console.log('Database models synchronized');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    
    if (retryCount < MAX_RETRIES - 1) {
      console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
      setTimeout(() => connectWithRetry(retryCount + 1), RETRY_DELAY);
    } else {
      console.error('Max retries reached. Unable to connect to the database.');
      process.exit(1);
    }
  }
}

connectWithRetry();
