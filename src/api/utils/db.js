const knex = require("knex");
const bookshelf = require("bookshelf");
// TODO build the DB manager instance for other fun maintanence stuff, like an install file
// const knexDbManager = require("knex-db-manager");

// get the db config
// TODO clear out these with symlinks
const dbConfig = require("../../../knexfile");

// build the knex instance
const knexInstance = knex(dbConfig);

/*
const dbManagerConfig = Object.assign(
  {},
  { knex: dbConfig },
  {
    dbManager: {
      superUser: dbConfig.connection.user,
      superPassword: dbConfig.connection.password
    }
  }
);

const dbManager = knexDbManager.databaseManagerFactory(dbManagerConfig);
*/

// TODO - https://github.com/tgriesser/bookshelf/issues/1088#issuecomment-171352099

// build the DB instance
const bookShelfInstance = bookshelf(knexInstance);

// don't forget the registry plugin
bookShelfInstance.plugin("registry");

module.exports = { db: bookShelfInstance, knexInstance };
