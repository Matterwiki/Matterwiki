//
// One stop shop for local development db. Create, migrate and seed local db.
//

const { initDb, seedDb } = require('../db/utils')

;(async function () {
    try {
        const { knex } = await initDb()

        console.log('✅ `matterwiki_dev` DB created')
        console.log('✅ DB migrations done')

        await seedDb(knex)
        console.log('✅ DB seeding done')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})()
