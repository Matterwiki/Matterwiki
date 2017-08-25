const { knexInstance, dbManager } = require("../../utils/db");

// TODO move to consts file when there are more
const ER_DB_CREATE_EXISTS = `ER_DB_CREATE_EXISTS`;

/**
 * Creates DB if it doesn't exist.
 * This is needed because the teardown (`afterAll` block) might not run if some test fails
 */
function createDbIfNotExists() {
  return dbManager
    .createDbOwnerIfNotExist()
    .then(() => dbManager.createDb())
    .catch(err => {
      // in case something went wrong
      if (err.code === ER_DB_CREATE_EXISTS) {
        return dbManager.dropDb().then(() => dbManager.createDb());
      }
    });
}

/**
 * Cleans up test db between tests
 * Provides options to keep or destroy user table
 */
function truncateDb(keepUsers = true) {
  // wasteful to `makeTestUsers` before every test
  const ignoreList = keepUsers ? ["user"] : [];
  return dbManager.truncateDb(ignoreList);
}

/**
 * Runs the seed on the database
 */
function seedDb() {
  return knexInstance.seed.run();
}

/**
 * Creates the testDb based on the name provided in config.test.env
 * Runs migrations
 * Runs general seed scripts
 */
function initTestDb() {
  return createDbIfNotExists()
    .then(() => knexInstance.migrate.latest())
    .then(() => seedDb());
}

/**
 * Destroys the Matterwiki test DB, used when all the tests are done
 */
function destroyTestDb() {
  return dbManager.createDbOwnerIfNotExist().then(() => dbManager.dropDb());
}

/**
 * This file houses all the helpers involving knex-db-manager, generally used in setup and teardown
 */
module.exports = {
  initTestDb,
  destroyTestDb,
  truncateDb,
  seedDb
};
