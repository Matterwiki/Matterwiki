exports.up = knex =>
  knex.schema.createTableIfNotExists("users", table => {
    table.increments().primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("about").notNullable();
    table.timestamps(true, true);
  });

exports.down = knex => knex.schema.dropTable("users");
