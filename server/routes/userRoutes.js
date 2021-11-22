const express  = require("express")
// const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/').get((req, res)=>{
  res.send("Hello from users")
})
//User Routes
router.post('/signup', authController.signup);
// router.post('/login', authController.login);

module.exports = router;
