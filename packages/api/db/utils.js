const Knex = require('knex')
const Promise = require('bluebird')
const { omit, keys, startsWith } = require('lodash')
const { knexSnakeCaseMappers } = require('objection')
const knexDbManager = require('knex-db-manager')

const knexConfig = require('../knexfile')

/**
 * Sets up the database to use for testing
 *
 * @param {*} t
 */
exports.initDb = async function initDb(deleteIfExists = false) {
    const dbManager = knexDbManager.databaseManagerFactory({
        // https://github.com/Vincit/knex-db-manager/issues/83
        knex: omit(knexConfig, keys(knexSnakeCaseMappers())),
        dbManager: {
            superUser: process.env.DB_SUPER_USER_NAME,
            superPassword: process.env.DB_SUPER_PASSWORD,
        },
    })

    const knex = Knex(knexConfig)

    await dbManager.createDbOwnerIfNotExist()

    await dbManager.createDb().catch(async err => {
        const recreateDb = err.code === 'ER_DB_CREATE_EXISTS' && deleteIfExists

        if (!recreateDb) throw err

        await dbManager.dropDb()
        await dbManager.createDb()
    })

    await dbManager.migrateDb()

    return { knex, dbManager }
}

exports.seedDb = function seedDb(knex) {
    return knex.seed.run()
}

exports.truncateDB = async function truncateDB(knex) {
    // Could've used knex-db-manager's truncate, but there seem to be some issues with it :(
    // TODO: Fix these in knex-db-manager through PRs
    // Let's handroll this for the time being!
    // 1. https://github.com/Vincit/knex-db-manager/issues/83
    // 2. https://github.com/Vincit/knex-db-manager/issues/84

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

exports.deleteDb = async function deleteDb(dbManager) {
    await dbManager.createDbOwnerIfNotExist()
    return dbManager.dropDb()
}
