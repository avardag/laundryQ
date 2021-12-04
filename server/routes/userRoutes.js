const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const validInfo = require("../utils/validInfo");

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello from users");
});
//User Routes
router.post("/signup", validInfo, authController.signup);
router.post("/login", validInfo, authController.login);

//will run protect MW for all routes after this line
router.use(authController.protect);
router.get("/verify", authController.verify);
router.get("/me", userController.getMe);
router.get("/user-dashboard", userController.userDashboard);
//protected routes here
module.exports = router;
