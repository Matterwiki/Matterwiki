
exports.up = function(knex, Promise) {
  return knex.schema.table('articles', function (table) {
	table.string('type').defaultTo("HTML");
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('articles', function (table) {
	table.dropColumn('type');
  })
};
