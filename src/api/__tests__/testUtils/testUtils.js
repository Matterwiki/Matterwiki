const request = require("supertest");

const app = require("../../app");

// rollup all the garbage in this dir for easy picking in tests
const dbHelpers = require("./dbHelpers");
const globalSetup = require("./globalSetup");
const makeJwt = require("./makeJwt");
const userHelpers = require("./userHelpers");
const testConstants = require("./testConstants");

module.exports = {
  // TODO predefined tokens for easy auth in API tests
  apiClient: request(app),
  dbHelpers,
  globalSetup,
  makeJwt,
  userHelpers,
  testConstants
};
