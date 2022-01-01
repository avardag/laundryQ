const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const db = require("../db/db");

generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPRIRES_IN,
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPRIRES_IN,
  });
  return { accessToken, refreshToken };
};

saveTokenToDB = async (userId, refreshToken) => {
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

exports.tokenSignAndSaveToDB = async (user) => {
  //tokens
  const tokens = generateTokens({
    id: user.id,
    email: user.email,
    isActivated: user.is_activated,
  });
  // save token to DB
  await saveTokenToDB(user.id, tokens.refreshToken);
  return tokens;
};

exports.removeTokenFromDB = async (refreshToken) => {
  const tokenData = await db("tokens")
    .where({ refresh_token: refreshToken })
    .delete();
};

/**
 *
 * @param token {String} access token from users Cookie storage, which is set by res.setCookie
 * @returns {Promise<*>} decodedUserData
 */
exports.validateAccessToken = async (token) => {
  //jwt.verify will throw errors if invalid token or expired.
  return await promisify(jwt.verify)(token, process.env.JWT_ACCESS_SECRET);
};

/**
 *
 * @param token {String} refresh token from users Local Storage
 * @returns {Promise<*>} decodedUserData
 */
exports.validateRefreshToken = async (token) => {
  // try {
  //   //jwt.verify will throw errors if invalid token or expired.
  //   return await promisify(jwt.verify)(token, process.env.JWT_REFRESH_SECRET);
  // } catch (e) {
  //   return null;
  // }
  return await promisify(jwt.verify)(token, process.env.JWT_REFRESH_SECRET);
};

exports.findTokenInDB = async (refreshToken) => {
  const tokenData = await db("tokens")
    .where({ refresh_token: refreshToken })
    .select("*")
    .first();
  return tokenData;
};
