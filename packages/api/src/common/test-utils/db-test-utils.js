const test = require('ava')
const Knex = require('knex')
const Promise = require('bluebird')
const { omit, keys, startsWith } = require('lodash')
const { knexSnakeCaseMappers } = require('objection')
const knexDbManager = require('knex-db-manager')

const knexConfig = require('../../../knexfile')

/**
 * Sets up the database to use for testing
 *
 * @param {*} t
 */
exports.initDb = async function initDb(t) {
    try {
        const dbM = knexDbManager.databaseManagerFactory({
            // https://github.com/Vincit/knex-db-manager/issues/83
            knex: omit(knexConfig, keys(knexSnakeCaseMappers())),
            dbManager: {
                superUser: process.env.TESTING_DB_SUPER_USER_NAME,
                superPassword: process.env.TESTING_DB_SUPER_PASSWORD,
            },
        })

        const knex = Knex(knexConfig)

        await dbM.createDbOwnerIfNotExist()

        await dbM.createDb().catch(async err => {
            if (err.code === 'ER_DB_CREATE_EXISTS') {
                await dbM.dropDb()
                await dbM.createDb()
            }
        })

        await dbM.migrateDb()

        t.context.knex = knex
        t.context.dbManager = dbM
    } catch (error) {
        console.error(error)
        t.fail(`DB setup failed: ${error.message}`)
        process.exit(1)
    }
}

exports.seedDb = function seedDb(t) {
    return t.context.knex.seed.run()
}

exports.truncateDB = async function truncateDB(t) {
    // Could've used knex-db-manager's truncate, but there seem to be some issues with it :(
    // TODO: Fix these in knex-db-manager through PRs
    // Let's handroll this for the time being!
    // 1. https://github.com/Vincit/knex-db-manager/issues/83
    // 2. https://github.com/Vincit/knex-db-manager/issues/84

    const { knex } = t.context

    const tableNames =
        (await knex('information_schema.tables')
            .select('table_name as table_name')
            .where('table_schema', process.env.DB_NAME)) || []

    const filtered = tableNames
        .map(t => t.tableName)
        .filter(t => !startsWith(t, 'knex_migrations'))

    await knex.raw('SET FOREIGN_KEY_CHECKS = 0')

    return Promise.map(filtered, tableName => knex.table(tableName).truncate())
}

exports.deleteDb = async function deleteDb(t) {
    const { dbManager } = t.context

    await dbManager.createDbOwnerIfNotExist()
    return dbManager.dropDb()
}

/**
 * Shorthand function that sets up AVA test hooks;
 * Use this for general DB based tests!
 */
exports.testDbSetup = async function testDbSetup() {
    test.before(exports.initDb)
    test.beforeEach(exports.seedDb)
    test.afterEach.always(exports.truncateDB)
    test.after.always(exports.deleteDb)
}
