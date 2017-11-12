/**
 * This module holds all the error objects for the API (HttpStatus > 400)
 */

const HttpStatus = require("http-status-codes");

module.exports = {
  DUPLICATE_USER: {
    code: "DUPLICATE_USER",
    message:
      "There was an error creating the user. A user with the same email already exists"
  },
  INVALID_ONE_TIME_TOKEN: {
    statusCode: HttpStatus.FORBIDDEN,
    code: "INVALID_ONE_TIME_TOKEN",
    message:
      "The token provided is invalid. Ask your admin to make a new one for you"
  },
  INVALID_LOGIN_CREDENTIALS: {
    statusCode: HttpStatus.UNAUTHORIZED,
    code: "INVALID_LOGIN_CREDENTIALS",
    message: "Incorrect email or password"
  },
  INVALID_TOKEN: {
    status: HttpStatus.FORBIDDEN,
    code: "INVALID_TOKEN",
    message: "Failed to authenticate token"
  },
  FORBIDDEN_ACCESS: {
    status: HttpStatus.FORBIDDEN,
    code: "FORBIDDEN_ACCESS",
    message: "You are not authorized to perform this action"
  }
};
