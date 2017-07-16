exports.up = knex =>
  knex.schema.table("articles", table => {
    table.integer("user_id").unsigned().references("users.id");
  });

exports.down = knex =>
  knex.schema.table("articles", table => {
    table.dropForeign("user_id");
    table.dropColumn("user_id");
  });
