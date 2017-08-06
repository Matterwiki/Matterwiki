exports.seed = knex =>
  knex("topic")
    .del()
    .then(() =>
      knex("topic").insert([
        { name: "general", description: "knowledge for everyone" }
      ])
    );
