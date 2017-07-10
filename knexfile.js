const config = require("dotenv").config({
  path: `config.${process.env.NODE_ENV}.env`
});

console.info(`DB Environment chosen: ${process.env.NODE_ENV}`);

const connection = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  debug: !!process.env.DB_DEBUGINFO
};

module.exports = {
  client: "mysql",
  connection,
  seeds: {
    directory: "./db/seeds/"
  },
  migrations: {
    directory: "./db/migrations/"
  }
};
