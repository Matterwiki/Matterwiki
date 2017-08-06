const knex = require("knex");
const Model = require("objection").Model;
const knexDbManager = require("knex-db-manager");

const dbConfig = require("../../../knexfile");

// build the knex instance
const knexInstance = knex(dbConfig);

// build the DB instance
Model.knex(knexInstance);

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
  // knex Instance for performing raw queries
  knexInstance,
  // for performing maintenance activities on the database
  dbManager
};
