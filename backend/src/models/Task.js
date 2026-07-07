// src/models/Task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('TODO', 'IN_PROGRESS', 'DONE'),
    allowNull: false,
    defaultValue: 'TODO',
  },
  priority: {
    type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
    allowNull: false,
    defaultValue: 'MEDIUM',
  },
  assignedTo: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'assigned_to',
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'project_id',
  },
}, {
  tableName: 'tasks',
});

module.exports = Task;
