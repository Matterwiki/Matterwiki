exports.up = knex =>
  knex.schema.table("articles", table => {
    table.integer("topic_id").unsigned().references("topics.id");
  });

exports.down = knex =>
  knex.schema.table("articles", table => {
    table.dropForeign("topic_id");
    table.dropColumn("topic_id");
  });
