// src/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: console.log, // set to false to silence SQL logs
    define: {
      underscored: true,   // created_at instead of createdAt in DB columns
      timestamps: true,
    },
  }
);

module.exports = sequelize;
