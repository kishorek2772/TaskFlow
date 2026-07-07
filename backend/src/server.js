// src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sequelize } = require('./models');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// ---- Middleware ----
// Equivalent to SecurityConfig's corsConfigurationSource()
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// ---- Routes ----
// Public: /api/auth/**   (matches SecurityConfig's permitAll())
app.use('/api/auth', authRoutes);

// Protected: everything else (authMiddleware runs inside these routers)
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'UP' }));

// ---- Global error handler (must be last) ----
app.use(errorHandler);

// ---- Start server after DB connects ----
async function start() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');

    // sync() creates tables if they don't exist — like ddl-auto=update
    await sequelize.sync({ alter: true });
    console.log('✅ Models synced.');

    app.listen(PORT, () => {
      console.log(`🚀 TaskFlow backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Unable to start server:', err);
    process.exit(1);
  }
}

start();
