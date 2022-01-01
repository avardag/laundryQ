const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const validInfo = require("../utils/validInfo");

const router = express.Router();

//User Routes
router.post("/signup", validInfo, authController.signup);
router.post("/login", validInfo, authController.login);
router.get("/logout", authController.logout);
//User Routes for profile activation and refresh tokens
router.get("/activate/:link", authController.activate);
router.get("/refresh", authController.refresh);

//will run protect MW for all routes after this line
router.use(authController.protect);
router.get("/", userController.getUsers);
router.get("/verify", authController.verify);
router.get("/me", userController.getMe);
router.get("/user-dashboard", userController.userDashboard);
//protected routes here
module.exports = router;
