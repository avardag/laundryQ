const express = require("express");
const laundryController = require("../controllers/laundryController");
const authController = require("../controllers/authController");
const validInfo = require("../utils/validInfo");

const router = express.Router();

//Laundry Routes
// router.post("/signup", validInfo, authController.signup);
router.get("/", laundryController.getLaundries);

//will run protect MW for all routes after this line
router.use(authController.protect);

router.post("/", laundryController.createLaundry);
router.post("/machines", laundryController.createMachine);
router.get("/machines/:laundryId", laundryController.getMachinesByLaundry);
router.post("/bookings", laundryController.createBooking);
router.get(
  "/bookings/laundry/:laundryId",
  laundryController.getBookingsByLaundry
);
router.get("/bookings/user/:userId", laundryController.getBookingsByUser);
router.delete("/bookings/:bookingId", laundryController.removeBooking);
//protected routes here
module.exports = router;
