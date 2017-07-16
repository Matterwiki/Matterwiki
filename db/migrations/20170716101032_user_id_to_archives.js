exports.up = knex =>
  knex.schema.table("archives", table => {
    table.integer("user_id").unsigned().references("users.id");
  });

exports.down = knex =>
  knex.schema.table("archives", table => {
    table.dropForeign("user_id");
    table.dropColumn("user_id");
  });
