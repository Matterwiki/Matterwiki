const test = require('ava')

const dbUtils = require('../../../db/utils')

/**
 * Sets up the database to use for testing
 *
 * @param {*} t
 */
async function initDb(t) {
    try {
        const { knex, dbManager } = await dbUtils.initDb(true)

        t.context.knex = knex
        t.context.dbManager = dbManager
    } catch (error) {
        console.error(error)
        t.fail(`DB setup failed: ${error.message}`)
        process.exit(1)
    }
}

function seedDb(t) {
    const { knex } = t.context
    return dbUtils.seedDb(knex)
}

function truncateDB(t) {
    const { knex } = t.context
    return dbUtils.truncateDB(knex)
}

function deleteDb(t) {
    const { dbManager } = t.context

    return dbUtils.deleteDb(dbManager)
}

/**
 * Shorthand function that sets up AVA test hooks;
 * Use this for general DB based tests!
 */
exports.testDbSetup = async function testDbSetup() {
    test.before(initDb)
    test.beforeEach(seedDb)
    test.afterEach.always(truncateDB)
    test.after.always(deleteDb)
}
