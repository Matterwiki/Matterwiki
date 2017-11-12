/**
 * This module bundles up all the data stubs for the users.
 * This file exports methods that can create super users, admin users and regular users. 
 */

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Promise = require("bluebird");
const { merge, isPlainObject } = require("lodash");

const userFactory = require("./testFactories/userFactory");
const UserModel = require("../../data/UserModel");

const { ROLES, SALT_ROUNDS } = require("../../constants");
const { DEFAULT_PASSWORD } = require("../testConstants");

const hashedPassword = bcrypt.hashSync(DEFAULT_PASSWORD, SALT_ROUNDS);

/**
 * A generic function that hashes password (or not) and inserts it into the DB
 * @param {Object[]} users 
 * @returns 
 */
async function createUsers(users) {
  const usersWithHash = await Promise.map(users, async user => {
    // This is a user who is in a "pending" state
    // It will have to be updated later with password
    // Typically looks like this before registration
    if (user.singleUseToken) return merge(user, { password: null });

    return merge(user, { password: hashedPassword });
  });

  return UserModel.insert(usersWithHash);
}

/**
 * Function that makes users
 * Uses `createUsers` internally
 * @param {number} [numberOfUsers=2] 
 * @returns 
 */
function makeTestUsers(numberOfUsers = 2) {
  const users = userFactory.build(numberOfUsers, ROLES.USER);
  return createUsers(users);
}

/**
 * Function that makes admins
 * Uses `createUsers` internally
 * @param {number} [numberOfAdmins=2] 
 * @returns 
 */
function makeTestAdmins(numberOfAdmins = 2) {
  let adminUsers = userFactory.build(numberOfAdmins, ROLES.ADMIN);

  if (isPlainObject(adminUsers)) adminUsers = [adminUsers];

  return createUsers(adminUsers);
}

/**
 * Makes users that are typically in an "invited" state..
 * Their password property will be `null` and singleUseToken property should be set to a guid
 * @param {*} numberOfUsers 
 */
function makeUsersWithSingleUseToken(numberOfUsers = 1) {
  let usersWithSingleUseToken = userFactory.build(numberOfUsers);

  if (isPlainObject(usersWithSingleUseToken))
    usersWithSingleUseToken = [usersWithSingleUseToken];

  usersWithSingleUseToken = usersWithSingleUseToken.map(user =>
    // keep only email in here - other fields will be set later
    ({
      singleUseToken: crypto.randomBytes(16).toString("hex"),
      email: user.email,
      role: user.role
    })
  );

  // create users now
  return createUsers(usersWithSingleUseToken);
}

/**
 * Function that returns 2 admins, 3 users and 1 super
 * @returns {Promise}
 */
function makeUsers() {
  return Promise.all([makeTestAdmins(2), makeTestUsers(3)]).then(users => ({
    admins: users[1],
    users: users[2]
  }));
}

module.exports = {
  makeTestUsers,
  makeTestAdmins,
  makeTestSupers,
  makeUsers,
  makeUsersWithSingleUseToken
};
