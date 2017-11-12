/**
 * This middleware checks if the passed in token is valid and has not expired.
 * This should be used for all routes that need authentication
 */

const jwt = require("jsonwebtoken");
const { isEmpty } = require("lodash");

const config = require("../../config");

const UserModel = require("../data/UserModel");
const { INVALID_TOKEN } = require("../apiErrors");

/**
 * Middleware for checking auth.
 * Verifies against the token sent.
 * Also checks if the email in the decoded payload is present in our database 
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {function} next 
 * @returns 
 */
async function checkAuthMiddleware(req, res, next) {
  // get the token from the headers
  const token = req.headers["x-access-token"];

  if (!token) {
    return next(INVALID_TOKEN);
  }

  try {
    // verify token
    const decodedToken = jwt.verify(token, config.AUTH_SECRET);

    // valid token
    if (decodedToken) {
      const userWithEmail = await UserModel.getMany({
        email: decodedToken.email
      });

      if (isEmpty(userWithEmail) || userWithEmail.length !== 1) {
        return next(INVALID_TOKEN);
      }

      // set the decoded user on the `req` obj
      req.user = userWithEmail[0];

      next();
    }
  } catch (err) {
    // invalid token, send 401
    return next(INVALID_TOKEN);
  }
}

module.exports = checkAuthMiddleware;
