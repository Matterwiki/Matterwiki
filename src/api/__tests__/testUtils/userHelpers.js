const bcrypt = require("bcryptjs");
const Promise = require("bluebird");
const { flatten } = require("lodash");

const userFactory = require("../factories/userFactory");
const { knexInstance: knex } = require("../../utils/db");

const { ROLES, SALT_ROUNDS } = require("../../utils/constants");
const { DEFAULT_PASSWORD } = require("./testConstants");

async function createUser(user) {
  const password = bcrypt.hashSync(DEFAULT_PASSWORD, SALT_ROUNDS);
  const userWithHash = Object.assign({}, user, {
    password
  });

  return knex("user")
    .insert(userWithHash)
    .then(id => knex("user").where("id", id));
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
  return (
    createUser(adminUser)
      // `createUser` gives us an array - let's pick out the only item in there
      .then(dbAdmin => dbAdmin[0])
  );
}

async function makeUsers() {
  const admin = await makeTestAdmin();
  const users = await makeTestUsers(3);

  return { admin, users: flatten(users) };
}

module.exports = { makeTestUsers, makeTestAdmin, makeUsers };
