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
      return res.status(401).json({
        status: "error",
        message: "Missing Credentials",
      });
    } else if (!validEmail(email)) {
      return res.status(401).json({
        status: "error",
        message: "Invalid Email",
      });
    } else if (password !== passwordConfirm) {
      return res.status(401).json({
        status: "error",
        message: "Passwords don't match",
      });
    } else if (password.length < 6) {
      return res.status(401).json({
        status: "error",
        message: "Password must be more than 6 chars",
      });
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json({
        status: "error",
        message: "Missing Credentials",
      });
    } else if (!validEmail(email)) {
      return res.status(401).json({
        status: "error",
        message: "Invalid Email",
      });
    }
  }

  next();
};
