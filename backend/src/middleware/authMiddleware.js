// src/middleware/authMiddleware.js
const { verifyToken } = require('../utils/jwt');
const { User } = require('../models');

/**
 * Runs before any protected route.
 * Equivalent to JwtAuthFilter in Spring — checks the Authorization header,
 * validates the token, and attaches the user to req.user.
 */
async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists.' });
    }

    req.user = user; // available in all downstream controllers
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = authMiddleware;
