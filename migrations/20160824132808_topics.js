
exports.up = function(knex, Promise) {
  return knex.schema.createTable('topics', function (table) {
    table.increments().primary();
    table.string('name');
    table.string('description');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('topics');
};
