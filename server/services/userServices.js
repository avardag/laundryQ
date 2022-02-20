const bcrypt = require("bcrypt");
const uuid = require("uuid");
const db = require("../db/db");
const sendMail = require("../utils/sendMail");
const jwtSignSend = require("../utils/jwtSignSend");
const AppError = require("../utils/appError");
const { createAndSendToken } = require("../utils/jwtSignSend");
const usersRepository = require("../repositories/usersRepository");

/**
 * Registers user, hashes password, sends email for activation saves to DB, saves tokens to DB
 * @param {{firstName:string, lastName:string, email:string, password:string, passwordConfirm:string, phone:string, city:string, address:string, postcode:string}} userCred
 * @returns {Promise<{accessToken: String, user: {firstName:string, lastName:string, id:number, isActivated: Boolean, email: String}, refreshToken: String}>}
 */
exports.registerUser = async function (userCred) {
  // check if user exists
  const user = await usersRepository.findOne({ email: userCred.email });
  if (user) {
    throw new AppError("User already exists", 400);
  }
  //hash password
  const hashedPass = await bcrypt.hash(userCred.password, 12);
  //activation link
  const activationLink = uuid.v4();

  const newUser = await usersRepository.create({
    first_name: userCred.firstName,
    last_name: userCred.lastName,
    email: userCred.email,
    password: hashedPass,
    phone: userCred.phone,
    activation_link: activationLink,
    city: userCred.city,
    address: userCred.address,
    postcode: userCred.postcode,
  });

  await sendMail.sendActivationMail(
    userCred.email,
    `${process.env.API_URL}/api/v1/users/activate/${activationLink}`
  );

  const tokens = await jwtSignSend.tokenSignAndSaveToDB(newUser);
  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      address: newUser.address,
      city: newUser.city,
      postcode: newUser.postcode,
      phone: newUser.phone,
      role: newUser.role,
      isActivated: newUser.is_activated,
      laundryId: newUser.laundry_id,
      accessToken: tokens.accessToken,
    },
    tokens: { ...tokens },
  };
};

exports.loginUser = async function (email, password) {
  //check if user exists && password is correct
  const user = await usersRepository.findByEmail(email);

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
      address: user.address,
      city: user.city,
      postcode: user.postcode,
      phone: user.phone,
      role: user.role,
      isActivated: user.is_activated,
      laundryId: user.laundry_id,
      accessToken: tokens.accessToken,
    },
    tokens: { ...tokens },
  };
};

exports.refresh = async function (refreshToken) {
  const userData = await jwtSignSend.validateRefreshToken(refreshToken);
  const tokenFromDB = await jwtSignSend.findTokenInDB(refreshToken);
  if (!userData || !tokenFromDB) return null;
  //get user info. In 2 months it can be updated
  const user = await usersRepository.findById(userData.id);

  //tokens
  const tokens = await jwtSignSend.tokenSignAndSaveToDB(user);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      address: user.address,
      city: user.city,
      postcode: user.postcode,
      phone: user.phone,
      role: user.role,
      isActivated: user.is_activated,
      laundryId: user.laundry_id,
      accessToken: tokens.accessToken,
    },
    tokens: { ...tokens },
  };
};
