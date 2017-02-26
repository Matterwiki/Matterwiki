
exports.up = function(knex, Promise) {
  return knex.schema.table('articles', function(t) {
       t.text('body_json');
   });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('articles', function(t) {
       t.dropColumn('body_json');
   });
};
