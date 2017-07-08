exports.seed = function(knex, Promise) {
  return knex("topics").del().then(function() {
    // Inserts seed entries
    return knex("topics").insert([
      { name: "general", description: "knowledge for everyone" }
    ]);
  });
};
