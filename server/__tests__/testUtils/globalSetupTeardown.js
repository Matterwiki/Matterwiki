/**
 * This module exports methods that help in setup and teardown of tests
 */

const fs = require("fs");
const Promise = require("bluebird");

const { userStore, tokenStore } = require("./dataStore");

const dbInit = require("../../../db");
const { makeUsers } = require("../dataStubs/userStubs");
const { makeTokens } = require("./testUtils");
const config = require("../../../config");
const { collectionMap } = require("../../constants");

Promise.promisifyAll(fs);

/**
 * Makes a DB file before every test suite begins work
 */
function setupAll() {
  // NOTE: This relies on the test run via `npm run test` (process.cwd())
  // TODO think of another way to initialize DB
  const filePath = `${process.cwd()}/${config.DB_NAME}.db`;
  return fs
    .writeFileAsync(filePath, "")
    .then(() => dbInit.init())
    .then(() =>
      makeUsers().then(users => {
        userStore.set(users);
        return users;
      })
    )
    .then(users =>
      makeTokens(users).then(tokens => {
        tokenStore.set(tokens);
        return tokens;
      })
    );
}

/**
 * Used as a setup block before every test.
 * 
 * @returns {Function}
 */
function setupEach() {}

/**
 * Destroy DB after every test suite completes
 * 
 */
function tearDownAll() {
  return dbInit.destroyDb();
}

/**
 * Used as a teardown block after every test.
 * Destroy all collections, so the next test can begin with a "clean slate"
 * Optionally keeps users collection so that we needn't recreate stuff
 * @param {boolean} [keepUsers=true] 
 * @returns 
 */
function tearDownEach(keepUsers = true) {
  return dbInit.loadDb().then(db => {
    Object.keys(collectionMap).forEach(key => {
      const collection = collectionMap[key];

      // Dont remove users collection
      if (keepUsers && collection === collectionMap.USER) return;

      db.removeCollection(collection);
    });
  });
}

module.exports = {
  setupAll,
  tearDownAll,
  setupEach,
  tearDownEach
};
