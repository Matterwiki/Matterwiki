const HttpStatus = require("http-status-codes");

const SALT_ROUNDS = 10;
const ADMIN_ID = 1;

const TOKEN_EXPIRATION = 86400;

const DEFAULT_CHANGELOG_MESSAGE = "Another drop in the ocean of knowledge";

// TODO The stuff that follow are ENUMS on the database. Could put them elsewhere when there's more
const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER"
};

const ARTICLE_HISTORY_TYPES = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE"
};

// TODO separate errors.js file
// TODO remove messages from here and let front end decide based on error code
const ERRORS = {
  DUPLICATE_TOPIC: {
    status: HttpStatus.CONFLICT,
    code: "ER_DUP_ENTRY",
    message: "This topic already exists. Please use another name"
  },
  DUPLICATE_ADMIN_USER: {
    status: HttpStatus.CONFLICT,
    code: "ER_DUP_ENTRY",
    message: "There was an error creating the admin user. Chances are you're already set up"
  },
  DUPLICATE_USER: {
    status: HttpStatus.CONFLICT,
    code: "ER_DUP_ENTRY",
    message: "This email is already in use. Please try another email"
  },
  CREDS_WRONG: {
    status: HttpStatus.BAD_REQUEST,
    code: "CREDS_WRONG",
    message: "Email or Password is wrong"
  },
  INVALID_TOKEN: {
    status: HttpStatus.UNAUTHORIZED,
    code: "INVALID_TOKEN",
    message: "Failed to authenticate token"
  },
  BAD_ARTICLE_CREATE: {
    status: HttpStatus.BAD_REQUEST,
    code: "BAD_ARTICLE_CREATE",
    message: "title, topicId and content are required"
  },
  BAD_ARTICLE_UPDATE: {
    status: HttpStatus.BAD_REQUEST,
    code: "BAD_ARTICLE_UPDATEE",
    message: "title, topicId, change_log and content are required"
  },
  NO_ACCESS: {
    status: HttpStatus.FORBIDDEN,
    code: "NO_ACCESS",
    message: "You are not authorized to perform this action"
  },
  NOT_FOUND: {
    status: HttpStatus.NOT_FOUND,
    code: "NOT_FOUND",
    message: "Resource was not found"
  },
  DELETE_DEFAULT_TOPIC: {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    code: "DELETE_DEFAULT_TOPIC",
    message: "Can not delete default topic!"
  },
  DELETE_DEFAULT_ADMIN: {
    status: HttpStatus.METHOD_NOT_ALLOWED,
    code: "DELETE_DEFAULT_ADMIN",
    message: "Can not delete admin user!"
  }
};

module.exports = {
  SALT_ROUNDS,
  ADMIN_ID,
  TOKEN_EXPIRATION,
  DEFAULT_CHANGELOG_MESSAGE,
  ROLES,
  ARTICLE_HISTORY_TYPES,
  ERRORS
};
