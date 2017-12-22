const { isBoolean } = require("lodash");

const { initTestDb, destroyTestDb, truncateDb, seedDb } = require("./dbHelpers");

const { makeUsers } = require("./userHelpers");
const makeJwt = require("./makeJwt");
const { userHolder, tokenHolder } = require("./modelHolder");

/**
 * Makes the test users needed, sets it in the holder for future use
 */
function makeTestUsers() {
  return makeUsers().then(testUsers => {
    userHolder.set(testUsers);
    return testUsers;
  });
}

/**
 * Makes the auth tokens needed, sets it in the holder for future use
 */
function makeTokens(testUsers) {
  const tokens = {};
  tokens.admin = makeJwt(testUsers.admin);
  tokens.user = makeJwt(testUsers.users[0]);

  tokenHolder.set(tokens);
}

/**
 * Convenience for API tests, which need default users, default tokens and all that
 */
module.exports = {
  /**
   * Setup block that runs before any of the tests, runs only once/suite
   * Inits DB, makes test users needed
   */
  setupAll: () =>
    initTestDb()
      .then(makeTestUsers)
      .then(makeTokens),

  /**
   * Teardown block that runs before any of the tests
   * 1) runs only once
   * 2) removes the test DB made in the beforeAll block
   */
  teardownAll: () => destroyTestDb(),

  /**
   * Setup block that runs before every single test
   * 1) truncates the DB and makes it clean
   * 2) runs seed scripts again
   */
  setupEach: (options = {}) => {
    const keepUsers = isBoolean(options.keepUsers) ? options.keepUsers : true;
    return truncateDb(keepUsers).then(seedDb);
  }
};
