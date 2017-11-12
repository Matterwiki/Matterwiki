/**
 * This module bundles all the exports in this directory, for easy importing during tests
 */

const request = require("supertest");
const Promise = require("bluebird");

const makeJwt = require("./makeJwt");
const app = require("../../app");

function makeTokens(users) {
  return Promise.props({
    user: makeJwt(users.users[0]),
    admin: makeJwt(users.admins[0]),
    super: makeJwt(users.super)
  });
}

module.exports = {
  // TODO predefined tokens for easy auth in API tests
  apiClient: request(app),
  makeTokens
};
