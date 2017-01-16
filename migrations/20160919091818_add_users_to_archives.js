
exports.up = function(knex, Promise) {
  return knex.schema.table('archives', function (table) {
    table.integer('user_id',10).unsigned().references('users.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('archives', function (table) {
    table.dropColumn('user_id');
  })
};
