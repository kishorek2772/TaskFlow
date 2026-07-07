// src/controllers/taskController.js
const { Task, Project } = require('../models');

/**
 * GET /api/tasks?projectId=1
 * Equivalent to TaskService.getTasksByProject()
 */

// TODO: add pagination here
async function getTasksByProject(req, res, next) {
  try {
    const { projectId } = req.query;
    if (!projectId) {
      return res.status(400).json({ message: 'projectId query param is required.' });
    }

    const tasks = await Task.findAll({
      where: { projectId },
      order: [['createdAt', 'ASC']],
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/tasks
 * Equivalent to TaskService.createTask()
 */
async function createTask(req, res, next) {
  try {
    const { title, description, status, priority, assignedTo, projectId } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ message: 'title and projectId are required.' });
    }

    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ message: `Project not found: ${projectId}` });
    }

    const task = await Task.create({
      title,
      description: description || '',
      status: status || 'TODO',
      priority: priority || 'MEDIUM',
      assignedTo: assignedTo || '',
      projectId,
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

/**
 * PUT /api/tasks/:id
 * Equivalent to TaskService.updateTask()
 */
async function updateTask(req, res, next) {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: `Task not found: ${req.params.id}` });
    }

    const { title, description, status, priority, assignedTo } = req.body;
    await task.update({ title, description, status, priority, assignedTo });

    res.json(task);
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/tasks/:id/status
 * Equivalent to TaskService.updateStatus()
 */
async function updateTaskStatus(req, res, next) {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ message: `Task not found: ${req.params.id}` });
    }

    const { status } = req.body;
    if (!['TODO', 'IN_PROGRESS', 'DONE'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' });
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    next(err);
  }
}

/**
 * DELETE /api/tasks/:id
 */
async function deleteTask(req, res, next) {
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ message: `Task not found: ${req.params.id}` });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getTasksByProject,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
