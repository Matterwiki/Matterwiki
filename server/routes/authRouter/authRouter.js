/**
 * This route joins up all "auth" routes:
 * - User registration - POST api/auth/register
 * - Forgot password  - POST api/auth/forgotPassword
 * - Login - POST api/auth/login
 * 
 */
const bodyParser = require("body-parser");
const HttpStatus = require("http-status-codes");
const { isString, isEmpty, overEvery, negate, omit } = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../../../config");

const authRouter = require("express").Router();

const UserModel = require("../../data/UserModel");
const {
  INVALID_ONE_TIME_TOKEN,
  INVALID_LOGIN_CREDENTIALS
} = require("../../apiErrors");
const {
  INVALID_REGISTRATION_DATA,
  INVALID_LOGIN_DATA
} = require("../../validationErrors");
const { SALT_ROUNDS, TOKEN_EXPIRATION } = require("../../constants");

/**
 * The middleware that handles user registration
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {function} next 
 * @returns 
 */
async function registerUser(req, res, next) {
  const { singleUseToken, email, password, name, about } = req.body;

  try {
    // https://lodash.com/docs/4.17.4#overEvery
    // Generates a function that returns true if all the conditions are met
    // If this sounds confusing RTM please
    // TODO if we do this in lots of places, we could abstract this to middleware
    // TODO set password limit
    // TODO check if email is properly formed
    const isValid = overEvery([negate(isEmpty), isString]);

    if (!isValid(email, password)) {
      return next(INVALID_REGISTRATION_DATA);
    }

    // No token, bye bye
    if (!singleUseToken) {
      return next(INVALID_ONE_TIME_TOKEN);
    }

    // Find all users with this token and email.. there should be only ONE
    let userWithSingleUseToken = await UserModel.getMany({
      singleUseToken,
      email
    });

    if (
      isEmpty(userWithSingleUseToken) ||
      userWithSingleUseToken.length !== 1
    ) {
      return next(INVALID_ONE_TIME_TOKEN);
    }

    // user found
    userWithSingleUseToken = userWithSingleUseToken[0];

    // hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const userToUpdate = {
      email,
      password: hashedPassword,
      name,
      about,
      singleUseToken: null
    };

    await UserModel.update(userWithSingleUseToken.id, userToUpdate);

    res.status(HttpStatus.CREATED).json({});
  } catch (err) {
    next(err);
  }
}

/**
 * The middleware that handles user login
 * @param {Object} req 
 * @param {Object} res 
 * @param {function} next 
 */
async function loginUser(req, res, next) {
  // TODO set password limit
  const { email, password } = req.body;

  try {
    // https://lodash.com/docs/4.17.4#overEvery
    // Generates a function that returns true if all the conditions are met
    // If this sounds confusing RTM please
    // TODO if we do this in lots of places, we could abstract this to middleware
    // TODO set password limit
    // TODO check if email is properly formed
    const isValid = overEvery([negate(isEmpty), isString]);

    if (!isValid(email, password)) {
      return next(INVALID_LOGIN_DATA);
    }

    // Find all users with email.. there should be only ONE, because email is a unique field
    let userWithEmail = await UserModel.getMany({ email });

    if (isEmpty(userWithEmail) || userWithEmail.length !== 1) {
      return next(INVALID_LOGIN_CREDENTIALS);
    }

    // There is only one user, so..
    userWithEmail = userWithEmail[0];

    // check if password is right
    const isPasswordValid = bcrypt.compareSync(
      password,
      userWithEmail.password
    );

    if (!isPasswordValid) {
      return next(INVALID_LOGIN_CREDENTIALS);
    }

    // everything is fine, make auth token and return some user fields
    // make token and attach it to user
    const token = jwt.sign(
      {
        // TODO maybe this needs more fields! :(
        id: userWithEmail.id,
        email: userWithEmail.email,
        role: userWithEmail.role,
        meta: userWithEmail.meta
      },
      config.AUTH_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );

    userWithEmail = omit(userWithEmail, ["password", "singleUseToken"]);
    userWithEmail.authToken = token;

    res.status(HttpStatus.CREATED).json(userWithEmail);
  } catch (err) {
    next(err);
  }
}

function resetPasswordForUser(req, res, next) {}

authRouter.post("/register", bodyParser.json(), registerUser);
authRouter.post("/login", bodyParser.json(), loginUser);
authRouter.post("/forgotPassword", resetPasswordForUser);

module.exports = authRouter;
