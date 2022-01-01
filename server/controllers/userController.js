const db = require("../db/db");
const catchAsyncError = require("../utils/catchAsyncError");

exports.getUsers = catchAsyncError(async (req, res, next) => {
  const users = await db
    .select("email", "first_name", "last_name", "phone", "is_activated")
    .from("users");
  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

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
