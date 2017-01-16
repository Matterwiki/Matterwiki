
exports.up = function(knex, Promise) {
  return knex.schema.createTable('archives', function (table) {
    table.increments().primary();
    table.integer('article_id',10).unsigned().references('articles.id').notNullable();
    table.string('title').notNullable();
    table.text('body').notNullable();
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('archives');
};
