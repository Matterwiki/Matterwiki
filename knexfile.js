const env = process.env.NODE_ENV || "dev";
const config = require("dotenv").config({
  path: `config.${env}.env`
});

// Config probably not found!
// TODO Customize this error
if (config.error) {
  throw new Error(config.error);
}

// make env specific database
let databaseName = `${process.env.DB_NAME}${env}`;

// some extra stuff to make tests run in parallel
if (env === "test") {
  // databaseName would end up being dbName + 'test' + <some # between 0 and 200>
  databaseName = `${databaseName}${Math.floor(Math.random() * 200)}`;
}

const connection = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: databaseName,
  debug: !!process.env.DB_DEBUGINFO
};

module.exports = {
  client: "mysql",
  connection,
  pool: {
    max: 1
  },
  seeds: {
    directory: "./db/seeds/"
  },
  migrations: {
    directory: "./db/migrations/"
  }
};
