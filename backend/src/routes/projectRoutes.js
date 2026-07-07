// src/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
} = require('../controllers/projectController');

// All project routes require a valid JWT
router.use(authMiddleware);

router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.delete('/:id', deleteProject);

module.exports = router;
