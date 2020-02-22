exports.up = async knex => {
    if (await knex.schema.hasTable('topic')) return

    await knex.schema.createTable('topic', table => {
        table.charset('utf8')
        table.collate('utf8_unicode_ci')
        table.increments().primary()
        table
            .string('name')
            .notNullable()
            .unique()
        table.string('description').notNullable()
        table.boolean('is_default').defaultTo(false)
        table
            .timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now())
        table
            .timestamp('modified_at')
            .notNullable()
            .defaultTo(knex.fn.now())
    })

    await knex.raw('alter table `topic` add fulltext(`name`,`description`);')
}

exports.down = async knex => {
    if (!(await knex.schema.hasTable('topic'))) return

    await knex.schema.dropTable('topic')
}
