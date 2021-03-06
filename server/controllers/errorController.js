const AppError = require("../utils/appError");

/**
 * Handles JWT verify Errors
 */
const handleJWTError = () =>
  new AppError("Invalid token. Please login again", 401);
/**
 * Handles JWT token expired Errors
 */
const handleJWTExpiredError = () =>
  new AppError("Expired token. Please login again", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational, trusted error. Send message to client
  if (err.isOperationalError) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    //Programming or other unknown errors. No error details for client
  } else {
    //1) Log the error
    console.error("ERROR");
    console.error(err);
    //2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  //send different types of errors in dev or prod
  if (process.env.NODE_ENV === "development") {
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

    sendErrorProd(err, res);
  }
};
