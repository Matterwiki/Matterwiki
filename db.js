var config      = require('./knexfile.js'); //requiring the knexfile that contains our connection object.
var knex        = require('knex')(config); // imports knex with our connection object (found in knexfile).

// Export the knex library for use. All knex commands remain the same.
module.exports = knex;

// Run the latest DB migrations whenever the server starts.
knex.migrate.latest([config]);
