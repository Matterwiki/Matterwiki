const env = process.env.NODE_ENV || "dev";
const config = require("dotenv").config({
  path: `config.${env}.env`
});

// Config probably not found!
// TODO Customize this error
if (config.error) {
  throw new Error(config.error);
}

const connection = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  // make env specific database
  database: `${process.env.DB_NAME}${env}`,
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
