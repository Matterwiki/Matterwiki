exports.up = async knex => {
    if (await knex.schema.hasTable('user')) {
        return
    }

    await knex.schema.createTable('user', table => {
        table.charset('utf8')
        table.collate('utf8_unicode_ci')
        table.increments().primary()
        table.string('name').notNullable()
        table
            .string('email')
            .notNullable()
            .unique()
        table.string('password').notNullable()
        table.string('about').notNullable()
        table.enu('role', ['ADMIN', 'USER']).notNullable()
        table
            .timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now())
        table
            .timestamp('modified_at')
            .notNullable()
            .defaultTo(knex.fn.now())
    })

    await knex.raw('alter table `user` add fulltext(`name`,`about`);')
}

exports.down = async knex => {
    if (!(await knex.schema.hasTable('user'))) {
        return
    }

    await knex.schema.dropTable('user')
}
