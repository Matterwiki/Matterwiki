exports.up = async knex => {
    if (await knex.schema.hasTable('article_history')) return

    await knex.schema.createTable('article_history', table => {
        table.charset('utf8')
        table.collate('utf8_unicode_ci')
        table.increments().primary()
        table.enu('type', ['CREATE', 'UPDATE', 'DELETE']).notNullable()
        table
            .integer('article_id')
            .unsigned()
            .references('article.id')
            .notNullable()
        // TODO: Should all this be replaced by the MySQL JSON type?
        table.string('title')
        table.text('content')
        table.string('change_log')
        table
            .integer('topic_id')
            .unsigned()
            .references('topic.id')
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
}

exports.down = async knex => {
    if (!(await knex.schema.hasTable('article_history'))) return

    await knex.schema.dropTable('article_history')
}
