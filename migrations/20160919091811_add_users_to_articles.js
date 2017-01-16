
exports.up = function(knex, Promise) {
  return knex.schema.table('articles', function (table) {
    table.integer('user_id',10).unsigned().references('users.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('articles', function (table) {
    table.dropColumn('user_id');
  })
};
