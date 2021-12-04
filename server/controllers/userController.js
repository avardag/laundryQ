const db = require("../db/db");

/**
 * Gets user info for logged in user
 router.get(/me', userController.getMe);
 */
exports.getMe = (req, res, next) => {
  // req.params.id = req.user.id;
  next();
};

exports.userDashboard = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      user: "req.user,",
    },
  });
};
