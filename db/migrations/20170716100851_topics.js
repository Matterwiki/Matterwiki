exports.up = knex =>
  knex.schema.createTable("topics", table => {
    table.increments().primary();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable("topics");
