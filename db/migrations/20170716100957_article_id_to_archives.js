exports.up = knex =>
  knex.schema.table("archives", table => {
    table
      .integer("article_id")
      .unsigned()
      .references("articles.id")
      .notNullable();
  });

exports.down = knex =>
  knex.schema.table("archives", table => {
    table.dropForeign("article_id");
    table.dropColumn("article_id");
  });
