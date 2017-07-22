const knex = require("knex");
const bookshelf = require("bookshelf");
const knexDbManager = require("knex-db-manager");

const dbConfig = require("../../../knexfile");

// build the knex instance
const knexInstance = knex(dbConfig);

// build the DB instance
const bookShelfInstance = bookshelf(knexInstance);

// don't forget the registry plugin
bookShelfInstance.plugin("registry");

// https://github.com/Vincit/knex-db-manager#api--usage-apiandusage
const dbManagerConfig = {
  knex: dbConfig,
  dbManager: {
    superUser: dbConfig.connection.user,
    superPassword: dbConfig.connection.password
  }
};

const dbManager = knexDbManager.databaseManagerFactory(dbManagerConfig);

module.exports = {
  // DB instance to be used throughout the models
  db: bookShelfInstance,
  // knex Instance for performing raw queries
  knexInstance,
  // for performing maintenance activities on the database
  dbManager
};
