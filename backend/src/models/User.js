// src/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // stored as bcrypt hash
  },
  role: {
    type: DataTypes.ENUM('USER', 'ADMIN'),
    allowNull: false,
    defaultValue: 'USER',
  },
}, {
  tableName: 'users',
});

module.exports = User;
