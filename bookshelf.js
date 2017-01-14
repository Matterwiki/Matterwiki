var config      = require('./knexfile.js'); //requiring the knexfile that contains our connection object.
var knex        = require('knex')(config); // imports knex with our connection object (found in knexfile).
var bookshelf   = require('bookshelf')(knex); //imports bookshelf along with our knex config.

// Exporting the bookshelf module for use in other files.
module.exports = bookshelf;
