const bcrypt = require("bcryptjs");

const userFactory = require("./factories/userFactory");
const UserModel = require("../models/user");

const { ADMIN_ID, SALT_ROUNDS } = require("../utils/constants");
const { DEFAULT_PASSWORD } = require("./testConstants");

async function createUser(user) {
  const password = bcrypt.hashSync(DEFAULT_PASSWORD, SALT_ROUNDS);
  const userWithHash = Object.assign({}, user, {
    password
  });

  return UserModel.post(userWithHash).then(dbUser => dbUser.toJSON());
}

function makeTestUsers(numberOfUsers = 2) {
  const users = userFactory.build(numberOfUsers);

  // TODO kinda inefficient, fix later
  return Promise.all(users.map(user => createUser(user)));
}

// TODO Change if we make more than one admin in the future
async function makeTestAdmin() {
  const adminUser = Object.assign({}, userFactory.build(1), { id: ADMIN_ID });
  return createUser(adminUser);
}

async function makeUsers() {
  const admin = await makeTestAdmin();
  const users = await makeTestUsers(3);

  return { admin, users };
}

module.exports = { makeTestUsers, makeTestAdmin, makeUsers };
