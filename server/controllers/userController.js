const db = require("../db/db");
const catchAsyncError = require("../utils/catchAsyncError");

exports.getUsers = catchAsyncError(async (req, res, next) => {
  const users = await db
    .select("id", "email", "first_name", "last_name", "phone", "is_activated")
    .from("users");
  const mappedUsers = users.map((user) => ({
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    phone: user.phone,
    isActivated: user.is_activated,
  }));
  res.status(200).json({
    status: "success",
    data: {
      users: mappedUsers,
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
