// src/controllers/projectController.js
const { Project, Task } = require('../models');

/**
 * GET /api/projects
 * Equivalent to ProjectService.getAllProjects()
 */
async function getAllProjects(req, res, next) {
  try {
    const projects = await Project.findAll({
      where: { ownerId: req.user.id },
      include: [{ model: Task, as: 'tasks' }],
      order: [['createdAt', 'DESC']],
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/projects/:id
 */
async function getProjectById(req, res, next) {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [{ model: Task, as: 'tasks' }],
    });
    if (!project) {
      return res.status(404).json({ message: `Project not found: ${req.params.id}` });
    }
    res.json(project);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/projects
 * Equivalent to ProjectService.createProject()
 */
async function createProject(req, res, next) {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'name is required.' });
    }

    const project = await Project.create({
      name,
      description: description || '',
      ownerId: req.user.id,
    });

    // Include empty tasks array so frontend shape matches GET responses
    const result = { ...project.toJSON(), tasks: [] };
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/projects/:id
 */
async function deleteProject(req, res, next) {
  try {
    const deleted = await Project.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ message: `Project not found: ${req.params.id}` });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllProjects, getProjectById, createProject, deleteProject };
