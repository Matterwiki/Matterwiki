const path = require("path");
const knex = require("knex");
const bookshelf = require("bookshelf");

// get the db config
// TODO clear out these with symlinks
const dbConfig = require("../../../knexfile");

// build the knex instance
const knexInstance = knex(dbConfig);

//TODO - https://github.com/tgriesser/bookshelf/issues/1088#issuecomment-171352099

// build the DB instance
const db = bookshelf(knexInstance);

// don't forget the registry plugin
db.plugin("registry");

module.exports = db;
