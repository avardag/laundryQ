const bcrypt = require("bcrypt");
const uuid = require("uuid");
const db = require("../db/db");
const sendMail = require("../utils/sendMail");
const jwtSignSend = require("../utils/jwtSignSend");
const AppError = require("../utils/appError");
const { createAndSendToken } = require("../utils/jwtSignSend");

/**
 * Registers user, hashes password, sends email for activation saves to DB, saves tokens to DB
 * @param firstName String
 * @param lastName String
 * @param email String
 * @param password String
 * @param passwordConfirm String
 * @param phone String
 * @returns {Promise<{accessToken: String, user: {firstName, lastName, id, isActivated: Boolean, email: String}, refreshToken: String}>}
 */
exports.registerUser = async function (
  firstName,
  lastName,
  email,
  password,
  passwordConfirm,
  phone
) {
  //hash password
  const hashedPass = await bcrypt.hash(password, 12);
  //activation link
  const activationLink = uuid.v4();

  const [newUser] = await db("users")
    .insert({
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPass,
      phone,
      activation_link: activationLink,
    })
    .returning([
      "id",
      "email",
      "first_name",
      "last_name",
      "password",
      "is_activated",
    ]);

  await sendMail.sendActivationMail(
    email,
    `${process.env.API_URL}/api/v1/users/activate/${activationLink}`
  );

  const tokens = await jwtSignSend.tokenSignAndSaveToDB(newUser);
  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      isActivated: newUser.is_activated,
      accessToken: tokens.accessToken
    },
    tokens:{...tokens}
  };
};

exports.loginUser = async function (email, password) {
  //check if user exists && password is correct
  const user = await db("users")
    .where({ email })
    .select([
      "id",
      "email",
      "first_name",
      "last_name",
      "password",
      "is_activated",
    ])
    .first();

  // const match = await bcrypt.compare(password, user.password);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return;
  }
  //tokens
  const tokens = await jwtSignSend.tokenSignAndSaveToDB(user);
  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      isActivated: user.is_activated,
      accessToken: tokens.accessToken
    },
    tokens:{...tokens}
  };
};

exports.refresh = async function (refreshToken) {
  const userData = await jwtSignSend.validateRefreshToken(refreshToken);
  const tokenFromDB = await jwtSignSend.findTokenInDB(refreshToken);
  if (!userData || !tokenFromDB) return null;
  //get user info. In 2 months it can be updated
  const user = await db("users")
    .where({ id: userData.id })
    .select(["id", "email", "first_name", "last_name", "is_activated"])
    .first();

  //tokens
  const tokens = await jwtSignSend.tokenSignAndSaveToDB(user);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      isActivated: user.is_activated,
      accessToken: tokens.accessToken
    },
    tokens:{...tokens}
  };
};
