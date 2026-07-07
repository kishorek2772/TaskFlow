// src/middleware/errorHandler.js

/**
 * Equivalent to GlobalExceptionHandler.java — catches anything thrown
 * (or passed to next(err)) in controllers and returns clean JSON.
 */
function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${err.message}`);

  const status = err.status || 500;
  res.status(status).json({
    message: err.message || 'Internal server error.',
    status,
    timestamp: new Date().toISOString(),
  });
}

module.exports = errorHandler;
