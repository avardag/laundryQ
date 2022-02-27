const db = require("../db/db");
const bookingsRepository = require("../repositories/bookingsRepository");
const laundriesRepository = require("../repositories/laundriesRepository");
const machinesRepository = require("../repositories/machinesRepository");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsyncError");
const generatePin = require("../utils/generatePIN");

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

exports.getBookingsByUser = catchAsyncError(async (req, res, next) => {
  const { userId } = req.params;
  if (req.user.id !== parseInt(userId, 10))
    throw new AppError("Forbidden to view", 403);
  //TODO: get user from req.user
  const bookingsArr = await bookingsRepository.findAllByUserId(userId);

  let bookings = [];
  if (bookingsArr.length !== 0) {
    bookings = bookingsArr.map((booking) => ({
      id: booking.id,
      dateTimeFrom: booking.datetime_from,
      dateTimeTill: booking.datetime_till,
      pin: booking.pin,
      createdAt: booking.created_at,
      machineId: booking.machine_id,
      size: booking.size,
      number: booking.number,
      name: booking.name,
      address: booking.address,
    }));
  }
  res.status(200).json({
    status: "success",
    data: {
      bookings,
    },
  });
});

exports.getBookingsByLaundry = catchAsyncError(async (req, res, next) => {
  const { laundryId } = req.params;
  const today = new Date().toDateString(); // returns the date portion of a Date object in English

  const bookingsArr = await bookingsRepository.findAllByLaundryIdFromDate({
    laundryId,
    date: today,
  });
  let bookings = [];
  if (bookingsArr.length !== 0) {
    bookings = bookingsArr.map((booking) => ({
      id: booking.id,
      dateTimeFrom: booking.datetime_from,
      dateTimeTill: booking.datetime_till,
      machineId: booking.machine_id,
      userId: booking.user_id,
      userFirstName: booking.first_name,
      userLastName: booking.last_name,
    }));
  }

  res.status(200).json({
    status: "success",
    data: {
      bookings,
    },
  });
});

exports.createBooking = catchAsyncError(async (req, res, next) => {
  const { machineId, dateTimeFrom, dateTimeTill, userId } = req.body;
  const pin = generatePin(5);
  const newBooking = await bookingsRepository.create({
    machine_id: machineId,
    datetime_from: new Date(dateTimeFrom).toUTCString(),
    datetime_till: new Date(dateTimeTill).toUTCString(),
    pin,
    user_id: userId,
  });
  res.status(200).json({
    status: "success",
    data: {
      booking: {
        machineId: newBooking.machine_id,
        id: newBooking.id,
        dateTimeFrom: newBooking.datetime_from,
        dateTimeTill: newBooking.datetime_till,
        pin: newBooking.pin,
      },
    },
  });
});

exports.removeBooking = catchAsyncError(async (req, res, next) => {
  const { bookingId } = req.params;
  const bookingToDelete = await bookingsRepository.getOneById(bookingId);

  if (!bookingToDelete) throw new AppError("Booking Not found", 400);

  if (req.user.id !== bookingToDelete.user_id)
    throw new AppError("Forbidden to delete", 403);
  //delete
  await bookingsRepository.destroy(bookingId);

  res.status(200).json({
    status: "success",
    data: { deletedId: bookingToDelete.id },
  });
});
