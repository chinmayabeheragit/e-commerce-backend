const sequelize = require('../db/sequelize');

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection has been established successfully.');
    await sequelize.sync(); // Optional: auto sync models to DB
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

module.exports = initializeDatabase;
