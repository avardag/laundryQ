const AppError = require("./appError");

//TODO : use validator library
module.exports = function (req, res, next) {
  const { email, firstName, lastName, password, passwordConfirm, phone } =
    req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/signup") {
    if (
      ![email, firstName, lastName, password, passwordConfirm, phone].every(
        Boolean
      )
    ) {
      return next(new AppError("Missing Credentials", 401));
    } else if (!validEmail(email)) {
      return next(new AppError("Invalid Email", 401));
    } else if (password !== passwordConfirm) {
      return next(new AppError("Passwords don't match", 401));
    } else if (password.length < 6) {
      return next(new AppError("Password must be more than 6 chars", 401));
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return next(new AppError("Missing Credentials", 401));
    } else if (!validEmail(email)) {
      return next(new AppError("Invalid Email", 401));
    }
  }
  next();
};
