exports.up = knex =>
  knex.schema.createTableIfNotExists("articles", table => {
    table.increments().primary();
    table.string("title").notNullable();
    table.text("body").notNullable();
    table.string("what_changed").notNullable();
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTableIfExists("articles");
