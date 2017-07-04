const SALT_ROUNDS = 10;
const ADMIN_ID = 1;

const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER"
};

// TODO could be its own file in the future
// TODO error codes could go here as well, so that we could just do `next(NO_TOKEN)`, for example
const ERRORS = {
  DUPLICATE_ADMIN_USER: {
    code: "ER_DUP_ENTRY",
    message:
      "There was an error creating the admin user. Chances are you've already set up"
  },
  USER_NOT_FOUND: {
    code: "USER_NOT_FOUND",
    message: "User not found"
  },
  CREDS_WRONG: {
    code: "CREDS_WRONG",
    message: "Email or Password is wrong"
  },
  NO_TOKEN: {
    code: "NO_TOKEN",
    message: "No token provided"
  },
  INVALID_TOKEN: {
    code: "INVALID_TOKEN",
    message: "Failed to authenticate token"
  },
  NO_ACCESS: {
    code: "NO_ACCESS",
    message: "You are not authorized to perform this action"
  },
  NOT_FOUND: {
    code: "NOT_FOUND",
    message: "Resource was not found"
  },
  DELETE_DEFAULT_TOPIC: {
    code: "DELETE_DEFAULT_TOPIC",
    message: "Can not delete default topic!"
  }
};

module.exports = { SALT_ROUNDS, ADMIN_ID, ERRORS, ROLES };
