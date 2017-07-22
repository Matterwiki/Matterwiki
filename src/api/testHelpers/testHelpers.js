const request = require("supertest");

const app = require("../app");
const { makeTestUsers, makeTestAdmin, makeUsers } = require("./makeUsers");
const makeJwt = require("./makeJwtToken");
const factories = require("./factories/factories");

const TEST_CONSTANTS = require("./testConstants");

module.exports = {
  makeTestUsers,
  makeTestAdmin,
  makeUsers,
  makeJwt,
  apiClient: request(app),
  TEST_CONSTANTS,
  factories
};
