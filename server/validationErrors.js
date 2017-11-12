/**
 * This module holds all the error objects that pertain to validation (HttpStatus 400)
 */
const HttpStatus = require("http-status-codes");

module.exports = {
  INVALID_REGISTRATION_DATA: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: "INVALID_REGISTRATION_DATA",
    message: "Email and password fields are required for registration"
  },
  INVALID_LOGIN_DATA: {
    statusCode: HttpStatus.BAD_REQUEST,
    code: "INVALID_LOGIN_DATA",
    message: "Email and password fields are required for logging in"
  }
};
