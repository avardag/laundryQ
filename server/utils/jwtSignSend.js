const jwt = require("jsonwebtoken");
const db = require("../db/db");

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
