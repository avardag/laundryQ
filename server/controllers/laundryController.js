const laundriesRepository = require("../repositories/laundriesRepository");
const machinesRepository = require("../repositories/machinesRepository");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsyncError");

exports.getLaundries = catchAsyncError(async (req, res, next) => {
  const laundries = await laundriesRepository.findAll();

  res.status(200).json({
    status: "success",
    data: {
      laundries,
    },
  });
});

exports.createLaundry = catchAsyncError(async (req, res, next) => {
  const { name, address, phone, city, postcode, admin_id } = req.body;

  if (![name, address, phone, city, postcode].every(Boolean))
    return next(new AppError("Missing input values", 400));
  const laundry = await laundriesRepository.create({
    name,
    address,
    phone,
    city,
    postcode,
    admin_id: admin_id ? admin_id : null,
  });
  res.status(200).json({
    status: "success",
    data: {
      laundry,
    },
  });
});
exports.updateLaundry = catchAsyncError(async (req, res, next) => {
  const { name, address, phone, city, postcode, admin_id } = req.body;

  const laundryId = req.params.laundryId;

  if (![name, address, phone, city, postcode].every(Boolean))
    return next(new AppError("Missing input values", 400));
  const laundry = await laundriesRepository.update(laundryId, {
    name,
    address,
    phone,
    city,
    postcode,
    admin_id: admin_id ? admin_id : null,
  });
  res.status(200).json({
    status: "success",
    data: {
      laundry,
    },
  });
});

exports.removeLaundry = catchAsyncError(async (req, res, next) => {
  const laundryId = req.params.laundryId;

  const laundryToDel = await laundriesRepository.getOneById(laundryId);
  if (!laundryToDel) throw new AppError("Laundry Not found", 400);

  // if (req.user.id !== laundryToDel.user_id)
  //   throw new AppError("Forbidden to delete", 403);
  //delete
  await laundriesRepository.destroy(laundryId);
  res.status(200).json({
    status: "success",
    data: { deletedId: laundryToDel.id },
  });
});

exports.activation = catchAsyncError(async (req, res, next) => {
  const laundryId = req.params.laundryId;
  const laundryToActivate = await laundriesRepository.getOneById(laundryId);

  if (!laundryToActivate) throw new AppError("Laundry Not found", 400);

  const laundry = await laundriesRepository.update(laundryId, {
    is_active: !laundryToActivate.is_active,
  });
  res.status(200).json({
    status: "success",
    data: {
      laundry,
    },
  });
});

exports.createMachine = catchAsyncError(async (req, res, next) => {
  const { laundryId, size, number } = req.body;
  const newMachine = await machinesRepository.create({
    laundry_id: laundryId,
    size,
    number,
  });
  res.status(200).json({
    status: "success",
    data: {
      newMachine,
    },
  });
});

exports.removeMachine = catchAsyncError(async (req, res, next) => {
  const machineId = req.params.machineId;

  const machineToDel = await machinesRepository.getOneById(machineId);
  if (!machineToDel) throw new AppError("Machine Not found", 400);

  await machinesRepository.destroy(machineId);
  res.status(200).json({
    status: "success",
    data: {
      deletedId: machineToDel.id,
    },
  });
});

exports.getMachinesByLaundry = catchAsyncError(async (req, res, next) => {
  const { laundryId } = req.params;

  const machines = await machinesRepository.findAllByLaundryId(laundryId);

  res.status(200).json({
    status: "success",
    data: {
      machines,
    },
  });
});
