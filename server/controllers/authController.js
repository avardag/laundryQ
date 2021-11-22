const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/db');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPRIRES_IN
  });
};
/**
 *
 * @param {Object} user
 * @param {Number} statusCode
 * @param {Object} res
 */
const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  //set cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPRIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt_auth', token, cookieOptions);
  //dont send user password
  user.password = undefined;
  console.log(user.password);

  //send response
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user
    }
  });
};
exports.signup = async (req, res, next) => {
  const {firstName, lastName, email, password, passwordConfirm, phone} = req.body;

  try {
// check if user exists
    const users = await db('users')
      .select("*")
      .where({email})
    if(users.length !== 0) return res.status(401).json({
      status:'error',
      message:"User already exists"
    })

    // return res.status(200).json(users)
  }catch (err){
     return res.status(500).json({
       status:'error',
       message:"Error connecting to DB"
     })
  }
  try {
    //hash password
    const hashedPass = await bcrypt.hash(password, 12)

  const [newUser] = await db('users')
    .insert({
    first_name:firstName,
    last_name:lastName,
    email,
    password:hashedPass,
    phone
  })
    .returning('*')

    createAndSendToken(newUser, 201, res);
  }catch (err){
    console.log(err);
  return res.status(500).json({message: 'error occued'})
  }

}

/*
//... fetch user from a db etc.

    const match = await bcrypt.compare(password, user.passwordHash);

    if(match) {
        //login
    }

    //...
* */