exports.seed = knex =>
  knex("topic")
    .del()
    .then(() =>
      knex("topic").insert([
        { name: "uncategorised", description: `the "limbo" topic` },
        { name: "general", description: "knowledge for everyone" }
      ])
    );
