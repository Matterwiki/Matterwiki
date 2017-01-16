
exports.up = function(knex, Promise) {
  return knex.schema.table('articles', function (table) {
    table.integer('topic_id',10).unsigned().references('topics.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('articles', function (table) {
    table.dropColumn('topic_id');
  })
};
