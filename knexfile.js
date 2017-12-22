const env = process.env.NODE_ENV;
const config = require("dotenv").config({
  path: `config.${env}.env`
});

// Config probably not found!
if (config.error) {
  throw new Error(config.error);
}

const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8",
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
