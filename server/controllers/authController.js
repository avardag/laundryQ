const { promisify } = require("util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const createAndSendToken = require("../utils/jwtSignSend").createAndSendToken;
const userServices = require("../services/userServices");
//////////////////////////
//SIGNUP
/////////////////////////
exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm, phone } =
    req.body;

  try {
    // check if user exists
    const users = await db("users").select("*").where({ email });
    if (users.length !== 0)
      return res.status(401).json({
        status: "error",
        message: "User already exists",
      });

    // return res.status(200).json(users)
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Error connecting to DB",
    });
  }
  try {
    //register user and get tokens
    const userData = await userServices.registerUser(
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      phone
    );
    //set cookie
    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPRIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      // secure: true, //
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt_r_auth", userData.refreshToken, cookieOptions);
    //send response
    res.status(200).json({
      status: "success",
      token: userData.refreshToken,
      data: {
        user: userData,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error occurred" });
  }
};
//////////////////////////
//Activate account
/////////////////////////
exports.activate = async (req, res, next) => {
  const activationLink = req.params.link;
  const user = await db("users")
    .where({ activation_link: activationLink })
    .select("*")
    .first();
  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "User Not Found",
    });
  }
  await db("users")
    .update({ is_activated: true })
    .where({ activation_link: activationLink });
  return res.redirect(process.env.CLIENT_URL); //send to React main page
};
//////////////////////////
//LOGIN
/////////////////////////
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  //check if email and passwords exist
  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Please enter your email and password",
    });
  }
  //check if user exists && password is correct
  const user = await db("users")
    .where({ email })
    .select(["id", "email", "first_name", "last_name", "password"])
    .first();

  // const match = await bcrypt.compare(password, user.password);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: "error",
      message: "Invalid email or password",
    });
  }
  //if everything is OK, send the token
  createAndSendToken(user, 200, res);
};
//////////////////////////
//LOGout
/////////////////////////
exports.logout = async (req, res, next) => {};
//////////////////////////
//Refresh tokens
/////////////////////////
exports.refresh = async (req, res, next) => {};

/**
 *  Authorization Middleware for protected routes
 */
exports.protect = async (req, res, next) => {
  //1) get token if exists
  let token;
  let user;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(403).json({
      status: "error",
      message: "Unauthorized",
    });
  }
  try {
    //2) Verification(validate the token)
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    //jwt.verify will throw errors if invalid token or expired.
    //3) check if user still exists
    const foundUser = await db("users")
      .where({ id: decoded.id })
      .select("*")
      .first();
    if (!foundUser) {
      return res.status(401).json({
        status: "error",
        message: "User no longer exists",
      });
    }
    user = foundUser;
  } catch (e) {
    console.log(e);
    return res.status(403).json({
      status: "error",
      message: "Unauthorized or wrong token",
    });
  }
  //if all OK, go to route handler. Access to protected routes
  req.user = user; //save user for future use
  next();
};

exports.verify = (req, res) => {
  const { email, first_name: firstName, last_name: lastName } = req.user;
  res.status(200).json({
    status: "success",
    user: {
      email,
      firstName,
      lastName,
    },
  });
};
