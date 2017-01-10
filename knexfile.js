module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: "./db/matterwiki.sqlite"
    },
    useNullAsDefault: true,
    debug: false
    }
  }

/*
The development object is the connection object for the development database.
We need to create more for different environments (production, testing, staging).
This environment is being used in the db.js file in the root directory. Check there.
*/
