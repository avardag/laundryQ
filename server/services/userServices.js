const bcrypt = require("bcrypt");
const uuid = require("uuid");
const db = require("../db/db");
const sendMail = require("../utils/sendMail");
const jwtSignSend = require("../utils/jwtSignSend");

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
    .returning("*");

  await sendMail.sendActivationMail(
    email,
    `${process.env.API_URL}/api/v1/users/activate/${activationLink}`
  );

  //tokens
  const tokens = jwtSignSend.generateTokens({
    id: newUser.id,
    email: newUser.email,
    isActivated: newUser.is_activated,
  });
  // save token to DB
  await jwtSignSend.saveTokenToDB(newUser.id, tokens.refreshToken);
  return {
    ...tokens,
    user: {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      isActivated: newUser.is_activated,
    },
  };
};
