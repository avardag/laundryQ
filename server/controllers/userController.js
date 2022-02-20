const db = require("../db/db");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsyncError");
const usersRepository = require("../repositories/usersRepository");

exports.getUsers = catchAsyncError(async (req, res, next) => {
  const users = await usersRepository.findAll();
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
// exports.getMe = (req, res, next) => {
//   // req.params.id = req.user.id;
//   next();
// };

// exports.userDashboard = async (req, res, next) => {
//   res.status(200).json({
//     status: "success",
//     data: {
//       user: "req.user,",
//     },
//   });
// };

exports.updateLaundry = catchAsyncError(async (req, res, next) => {
  const { id, laundryId } = req.body;
  if (!id || !laundryId) throw new AppError("Please choose Laundry", 400);

  const user = await usersRepository.update(id, {
    laundry_id: laundryId,
  });
  if (!user) throw new AppError("Could not find a user", 400);

  res.status(200).json({
    status: "success",
    user: {
      laundryId: user.laundry_id,
    },
  });
});
