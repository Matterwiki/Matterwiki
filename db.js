/**
 * One point to setup DB per environment.
 * In the future, it will be able to change DB providers (loki vs mongo)
 */

const Loki = require("lokijs");

const config = require("./config");

// https://rawgit.com/techfort/LokiJS/master/jsdoc/LokiFsStructuredAdapter.html
// TODO does not work as of now, see: https://github.com/techfort/LokiJS/issues/628
// Defaults to Node FS Adapter as of now
// TODO use partitioned adapter as well
// const LokiFSStructuredAdapter = require("lokijs/src/loki-fs-structured-adapter");

let db = null;

module.exports = {
  init() {
    return new Promise((resolve, reject) => {
      db = new Loki(`${config.DB_NAME}.db`, {
        autosave: true,
        autosaveInterval: 3000,
        autoload: true,
        autoloadCallback: err => {
          if (err) return reject(err);
          resolve();
        },
        verbose: true
      });
    });
  },
  loadDb() {
    if (!db) throw new Error("Db not initialized yet!");
    return Promise.resolve(db);
  },
  destroyDb() {
    return new Promise((resolve, reject) => {
      db.deleteDatabase(err => {
        if (err) return reject(err);

        return resolve();
      });
    });
  },
  saveDb() {
    return new Promise((resolve, reject) => {
      db.saveDatabase(err => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }
};
