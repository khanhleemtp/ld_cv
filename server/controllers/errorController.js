const AppError = require('../utils/appError');

const handleObjectId = (err) => {
  return new AppError(`Invalid ${err.path}: ${err.value} `, 400);
};

const handleDuplicateFieldsDB = (err) => {
  let value = Object.values(err.keyValue).join(' ');
  return new AppError(
    `Duplicate field ${value} . Please use another value`,
    400
  );
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  console.log(errors);
  const message = `Invalid data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Invalid token. Please login again', 401);

const handleTokenExpiredError = (err) =>
  new AppError('Your Token has expired, please log in again', 401);

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programing or other unknown error error: don't leak error details
  } else {
    // 1, Log Error
    console.error('ERROR 💥', err);

    // 2, Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err: err,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV == 'development') {
    sendErrorDev(err, res);
  } else {
    let error = {};

    if (err.name === 'CastError') error = handleObjectId(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError(err);
    if (err.name === 'TokenExpiredError') error = handleTokenExpiredError(err);
    if (Object.keys(error).length === 0) {
      return sendErrorProd(err, res);
    }
    sendErrorProd(error, res);
  }
};
