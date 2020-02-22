exports.up = async knex => {
    if (await knex.schema.hasTable('article')) return

    await knex.schema.createTable('article', table => {
        table.charset('utf8')
        table.collate('utf8_unicode_ci')
        table.increments().primary()
        table
            .string('title')
            .notNullable()
            .unique()
        table.text('content', 'mediumtext').notNullable()
        table.string('change_log').notNullable()
        table.text('search_tokens', 'mediumtext').notNullable()
        table
            .integer('topic_id')
            .unsigned()
            .references('topic.id')
            .notNullable()
        table
            .integer('created_by_id')
            .unsigned()
            .references('user.id')
        table
            .integer('modified_by_id')
            .unsigned()
            .references('user.id')
        table
            .timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now())
        table
            .timestamp('modified_at')
            .notNullable()
            .defaultTo(knex.fn.now())
    })

    await knex.raw('alter table `article` add fulltext(`search_tokens`);')
}

exports.down = async knex => {
    if (!(await knex.schema.hasTable('article'))) return

    await knex.schema.dropTable('article')
}
