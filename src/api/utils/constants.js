const SALT_ROUNDS = 10;
const ADMIN_ID = 1;

// TODO setup better timeout value
const TOKEN_EXPIRATION = 86400;

const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER"
};

// TODO could be its own file in the future
const ERRORS = {
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
    status: 403,
    code: "DELETE_DEFAULT_TOPIC",
    message: "Can not delete default topic!"
  }
};

module.exports = { SALT_ROUNDS, ADMIN_ID, TOKEN_EXPIRATION, ERRORS, ROLES };
