const { Sequelize } = require('sequelize');
require('dotenv').config({ path: './config/dev.env' });

const sequelize = new Sequelize(process.env.MONGODB_URL, {
  dialect: 'postgres',
  logging: false, // set to true to see SQL logs
});

module.exports = sequelize;
