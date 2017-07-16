const { knexInstance } = require("../utils/db");

// initialize the DB - reinit DB, run migration, run general seed stuff
// TODO create DB at this level using knex-db-manager package - check src/api/utils/db
const initMatterWikiDb = () =>
  knexInstance.migrate
    .rollback()
    .then(() => knexInstance.migrate.latest())
    .then(() => knexInstance.seed.run());

// rollback everything that has been done till now
const destroyMatterWikiDb = () => knexInstance.migrate.rollback();

// create the DB
beforeAll(done => {
  initMatterWikiDb().then(done);
});

// destroy the DB
afterAll(done => {
  destroyMatterWikiDb().then(done);
});

// TODO could we move all this DB init logic elsewhere?

// Init general DB stuff needed
// Init users (admin and general)
// Init articles
// Init more topics
