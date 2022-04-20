const express = require("express");
const bookingsController = require("../controllers/bookingsController");
const authController = require("../controllers/authController");

const router = express.Router();

//will run protect MW for all routes after this line
router.use(authController.protect);
router.post("/", bookingsController.createBooking);
router.get("/laundry/:laundryId", bookingsController.getBookingsByLaundry);
router.get("/user/:userId", bookingsController.getBookingsByUser);
router.delete("/:bookingId", bookingsController.removeBooking);

module.exports = router;
