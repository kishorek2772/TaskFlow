// src/utils/jwt.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Generate a JWT for a given user.
 * Equivalent to JwtUtil.generateToken() in the Spring version.
 */
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
}

/**
 * Verify and decode a token. Throws if invalid/expired.
 * Equivalent to JwtUtil.validateToken() + extractEmail().
 */
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { generateToken, verifyToken };
