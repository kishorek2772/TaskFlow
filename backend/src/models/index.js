// src/models/index.js
// This is where relationships (foreign keys) are wired up — equivalent to
// @OneToMany / @ManyToOne in your JPA entities.

const sequelize = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');

// One User has many Projects
User.hasMany(Project, { foreignKey: 'ownerId', as: 'projects' });
Project.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

// One Project has many Tasks (cascade delete like CascadeType.ALL)
Project.hasMany(Task, { foreignKey: 'projectId', as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

module.exports = {
  sequelize,
  User,
  Project,
  Task,
};
