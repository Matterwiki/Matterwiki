
exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', function (table) {
    table.increments().primary();
    table.string('title');
    table.text('body');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw("(datetime(CURRENT_TIMESTAMP,'localtime'))"));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw("(datetime(CURRENT_TIMESTAMP,'localtime'))"));
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('articles');
};
