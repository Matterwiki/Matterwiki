/**
 * List of collections that the API can interact with
 */
const collectionMap = {
  USER: "user"
};

/**
 * All User roles
 */
const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER"
};

const SALT_ROUNDS = 10;
const TOKEN_EXPIRATION = 86400;

module.exports = {
  collectionMap,
  ROLES,
  SALT_ROUNDS,
  TOKEN_EXPIRATION
};
