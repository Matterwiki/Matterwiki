
exports.up = function(knex, Promise) {
  return knex.schema.createTable('articles', function (table) {
  table.increments();
  table.string('title');
  table.text('body');
  table.timestamps();
})
};

exports.down = function(knex, Promise) {

};
