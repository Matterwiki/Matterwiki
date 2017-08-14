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
    status: 409,
    code: "ER_DUP_ENTRY",
    message: "This topic already exists. Please use another name"
  },
  DUPLICATE_ADMIN_USER: {
    status: 409,
    code: "ER_DUP_ENTRY",
    message:
      "There was an error creating the admin user. Chances are you're already set up"
  },
  CREDS_WRONG: {
    status: 401,
    code: "CREDS_WRONG",
    message: "Email or Password is wrong"
  },
  INVALID_TOKEN: {
    status: 401,
    code: "INVALID_TOKEN",
    message: "Failed to authenticate token"
  },
  NO_ACCESS: {
    status: 403,
    code: "NO_ACCESS",
    message: "You are not authorized to perform this action"
  },
  NOT_FOUND: {
    status: 404,
    code: "NOT_FOUND",
    message: "Resource was not found"
  },
  DELETE_DEFAULT_TOPIC: {
    status: 405,
    code: "DELETE_DEFAULT_TOPIC",
    message: "Can not delete default topic!"
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
