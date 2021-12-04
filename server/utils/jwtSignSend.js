const jwt = require("jsonwebtoken");
const db = require("../db/db");
/*
JWT_ACCESS_SECRET=batlgoyab_rag1i_bugo_hab
JWT_REFRESH_SECRET=kdiofjew09tmflksdmfsg09
JWT_ACCESS_EXPRIRES_IN=30d
JWT_REFRESH_EXPRIRES_IN=30d
JWT_COOKIE_EXPRIRES_IN=30*/

exports.generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPRIRES_IN,
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPRIRES_IN,
  });
  return { accessToken, refreshToken };
};

exports.saveTokenToDB = async (userId, refreshToken) => {
  const tokenData = await db("tokens").select("*").where({ user_id: userId });
  if (tokenData.length > 0) {
    const token = await db("tokens")
      .where({ user_id: userId })
      .update({ refresh_token: refreshToken })
      .returning(["id", "refresh_token", "user_id"]);
    return token;
  }
  const [token] = await db("tokens")
    .insert({
      user_id: userId,
      refresh_token: refreshToken,
    })
    .returning("*");
  return token;
};

//////////////////////////////
//old

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPRIRES_IN,
  });
};

/**
 *
 * @param {Object} user
 * @param {Number} statusCode
 * @param {Object} res
 */
exports.createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  //set cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPRIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: true, //
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt_auth", token, cookieOptions);
  const userDataToSend = {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
  };

  //send response
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: userDataToSend,
    },
  });
};
