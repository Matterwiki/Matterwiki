exports.seed = (knex, Promise) =>
  knex("topics").del().then(() =>
    // Inserts seed entries
    knex("topics").insert([
      { name: "general", description: "knowledge for everyone" }
    ])
  );
