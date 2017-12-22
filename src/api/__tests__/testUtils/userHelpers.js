const bcrypt = require("bcryptjs");
const Promise = require("bluebird");
const { assign } = require("lodash");

const userFactory = require("../factories/userFactory");

const UserModel = require("../../models/userModel");

const { ROLES, SALT_ROUNDS } = require("../../utils/constants");
const { DEFAULT_PASSWORD } = require("./testConstants");

const hashedPassword = bcrypt.hashSync(DEFAULT_PASSWORD, SALT_ROUNDS);

async function createUser(user) {
  const userWithHash = Object.assign({}, user, {
    password: hashedPassword
  });

  return UserModel.query()
    .insertAndFetch(userWithHash)
    .then(u =>
      assign(u, {
        created_at: u.created_at.toISOString(),
        updated_at: u.updated_at.toISOString()
      })
    );
}

function makeTestUsers(numberOfUsers = 2) {
  const users = userFactory.build(numberOfUsers);

  // TODO kinda inefficient, fix later
  return Promise.map(users, user => createUser(user));
}

// TODO Change if we make more than one admin in the future
async function makeTestAdmin() {
  const adminUser = Object.assign({}, userFactory.build(1), {
    role: ROLES.ADMIN
  });
  return createUser(adminUser);
}

async function makeUsers() {
  const admin = await makeTestAdmin();
  const users = await makeTestUsers(3);

  return { admin, users };
}

module.exports = { makeTestUsers, makeTestAdmin, makeUsers };
