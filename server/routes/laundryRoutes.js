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
router.put("/:laundryId", laundryController.updateLaundry);
router.post("/machines", laundryController.createMachine);
router.post("/machines/:machineId", laundryController.removeMachine);
router.get("/machines/:laundryId", laundryController.getMachinesByLaundry);

//will run restrictTo MW for all routes after this line
router.use(authController.restrictTo("admin", "superuser"));
//activate laundry
router.post("/activate/:laundryId", laundryController.activation);

//delete laundry
router.delete("/:laundryId", laundryController.removeLaundry);

module.exports = router;
