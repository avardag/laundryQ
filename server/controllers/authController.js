const { promisify } = require("util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const jwtSignSend = require("../utils/jwtSignSend");
const userServices = require("../services/userServices");
const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/appError");

/**
 *
 * @param res {Object} - response object of express
 * @param cookieName {String} - name of a cookie to be set on client
 * @param cookieData {String} - refresh token
 */
const setCookie = function (res, cookieData, cookieName = "jwt_r_auth") {
  //set cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPRIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: true, //
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie(cookieName, cookieData, cookieOptions);
};
//////////////////////////
//SIGNUP
/////////////////////////
exports.signup = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm, phone } =
    req.body;

  // check if user exists
  const users = await db("users").select("*").where({ email });
  if (users.length !== 0) {
    return next(new AppError("User already exists", 401));
  }

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
  setCookie(res, userData.refreshToken);
  //send response
  res.status(200).json({
    status: "success",
    token: userData.refreshToken,
    data: {
      user: userData,
    },
  });
});
//////////////////////////
//Activate account
/////////////////////////
exports.activate = catchAsyncError(async (req, res, next) => {
  const activationLink = req.params.link;
  const user = await db("users")
    .where({ activation_link: activationLink })
    .select("*")
    .first();
  if (!user) return next(new AppError("User Not Found", 401));
  await db("users")
    .update({ is_activated: true })
    .where({ activation_link: activationLink });
  return res.redirect(process.env.CLIENT_URL); //send to React main page
});
//////////////////////////
//LOGIN
/////////////////////////
exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  //check if email and passwords exist
  if (!email || !password)
    return next(new AppError("Please enter your email and password", 400));

  const userData = await userServices.loginUser(email, password, next);
  if (!userData) return next(new AppError("Invalid email or password", 401));
  //set cookie
  setCookie(res, userData.refreshToken);
  //send response
  res.status(200).json({
    status: "success",
    token: userData.refreshToken,
    data: {
      user: userData,
    },
  });
});
//////////////////////////
//LOGout
/////////////////////////
exports.logout = catchAsyncError(async (req, res, next) => {
  const { jwt_r_auth } = req.cookies;
  await jwtSignSend.removeTokenFromDB(jwt_r_auth);
  res.clearCookie("jwt_r_auth");
  //send response
  res.status(200).json({
    status: "success",
  });
});
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
