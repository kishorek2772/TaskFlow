// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Public routes — no authMiddleware here
router.post('/register', register);
router.post('/login', login);

module.exports = router;
