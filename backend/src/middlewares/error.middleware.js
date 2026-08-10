const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: {
        message: 'Validation error',
        details: err.errors.map(e => e.message),
        status: 400
      }
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: {
        message: 'Duplicate entry',
        details: err.errors.map(e => e.message),
        status: 409
      }
    });
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      error: {
        message: 'Foreign key constraint error',
        details: err.message,
        status: 400
      }
    });
  }

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      status: err.status || 500
    }
  });
};

module.exports = errorMiddleware;
