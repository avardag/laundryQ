const os = require("os");
const { promisify } = require("util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const jwtSignSend = require("../utils/jwtSignSend");
const userServices = require("../services/userServices");
const catchAsyncError = require("../utils/catchAsyncError");
const AppError = require("../utils/appError");
const { validateAccessToken } = require("../utils/jwtSignSend");
const usersRepository = require("../repositories/usersRepository");

/**
    400 Bad Request -the server cannot or will not process the request due to 
      something that is perceived to be a client error (for example, malformed request syntax,
      invalid request message framing, or deceptive request routing).
    401 Unauthorized -the client request has not been completed because it lacks valid authentication credentials for
        the requested resource. This status code is similar to the 403 Forbidden status code,
        except that in situations resulting in this status code, user authentication can allow access to the resource. 
    402 Payment Required
    403 Forbidden -server understands the request but refuses to authorize it.
        re-authenticating makes no difference. The access is permanently forbidden and
        tied to the application logic, such as insufficient rights to a resource.
    404 Not Found -server cannot find the requested resource
 */
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
  console.log("signup");
  //register user and get tokens
  const userData = await userServices.registerUser(req.body);
  //set cookie
  setCookie(res, userData.tokens.refreshToken);
  //send response
  res.status(200).json({
    status: "success",
    user: userData.user,
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
  if (!user) return next(new AppError("User Not Found", 400));
  await db("users")
    .update({ is_activated: true })
    .where({ activation_link: activationLink });
  return res.redirect(process.env.CLIENT_URL); //send to React main page
});
//////////////////////////
//LOGIN
/////////////////////////
exports.login = catchAsyncError(async (req, res, next) => {
  console.log("sg");
  const { email, password } = req.body;
  //check if email and passwords exist
  if (!email || !password)
    return next(new AppError("Please enter your email and password", 400));

  const userData = await userServices.loginUser(email, password, next);
  if (!userData) return next(new AppError("Invalid email or password", 400));
  //set cookie
  setCookie(res, userData.tokens.refreshToken);
  //send response
  res.status(200).json({
    status: "success",
    user: userData.user,
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
exports.refresh = catchAsyncError(async (req, res, next) => {
  const { jwt_r_auth } = req.cookies;
  if (!jwt_r_auth) return next(new AppError("No token provided", 401));
  const userData = await userServices.refresh(jwt_r_auth);
  if (!userData) return next(new AppError("Invalid refresh token", 401));
  //set cookie
  setCookie(res, userData.tokens.refreshToken);
  //send response
  res.status(200).json({
    status: "success",
    user: userData.user,
  });
});

/**
 *  Authorization Middleware for protected routes
 */
exports.protect = catchAsyncError(async (req, res, next) => {
  //1) get token if exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in", 403));
  }
  //2) Verification(validate the token)
  const decodedUserData = await validateAccessToken(token);
  //jwt.verify will throw errors if invalid token or expired. in global Error handler
  //3) check if user still exists
  const foundUser = await usersRepository.findById(decodedUserData.id);

  if (!foundUser) {
    return next(new AppError("User no longer exists", 401));
  }

  //if all OK, go to route handler. Access to protected routes
  req.user = foundUser; //save user for future use
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    //roles ['admin', 'lead-guide']
    if (!roles.includes(req.user.role)) {
      return next(new AppError("No permission to perform this action", 403));
    }
    next();
  };
};

//endpoint just to check if user is signed in
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
