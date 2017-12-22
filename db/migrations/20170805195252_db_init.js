exports.up = knex => {
  const createUserTable = () =>
    knex.schema.createTableIfNotExists("user", table => {
      table.charset("utf8");
      table.collate("utf8_unicode_ci");
      table.increments().primary();
      table.string("name").notNullable();
      table
        .string("email")
        .notNullable()
        .unique();
      table.string("password").notNullable();
      table.string("about").notNullable();
      table.enu("role", ["ADMIN", "USER"]).notNullable();
      table
        .boolean("is_active")
        .notNullable()
        .default(true);
      table.timestamps(true, true);
    });

  const createTopicTable = () =>
    knex.schema.createTable("topic", table => {
      table.charset("utf8");
      table.collate("utf8_unicode_ci");
      table.increments().primary();
      table
        .string("name")
        .notNullable()
        .unique();
      table.string("description").notNullable();
      table
        .boolean("is_active")
        .notNullable()
        .defaultTo(true);
      table.timestamps(true, true);
    });

  const createArticleTable = () =>
    knex.schema.createTableIfNotExists("article", table => {
      table.charset("utf8");
      table.collate("utf8_unicode_ci");
      table.increments().primary();
      table.string("title").notNullable();
      table.text("content").notNullable();
      table.string("change_log").notNullable();
      table
        .integer("topic_id")
        .unsigned()
        .references("topic.id")
        .notNullable();
      table
        .integer("created_by_id")
        .unsigned()
        .references("user.id");
      table
        .integer("modified_by_id")
        .unsigned()
        .references("user.id");
      table
        .boolean("is_active")
        .notNullable()
        .defaultTo(true);
      table.timestamps(true, true);
    });

  const createArticleHistoryTable = () =>
    knex.schema.createTableIfNotExists("article_history", table => {
      table.charset("utf8");
      table.collate("utf8_unicode_ci");
      table.increments().primary();
      table.enu("type", ["CREATE", "UPDATE", "DELETE"]).notNullable();
      table
        .integer("article_id")
        .unsigned()
        .references("article.id")
        .notNullable();
      table.string("title");
      table.text("content");
      table.string("change_log");
      table
        .integer("topic_id")
        .unsigned()
        .references("topic.id");
      table
        .integer("created_by_id")
        .unsigned()
        .references("user.id");
      table
        .integer("modified_by_id")
        .unsigned()
        .references("user.id");
      table
        .boolean("is_active")
        .notNullable()
        .defaultTo(true);
      table.timestamps(true, true);
    });

  return createUserTable()
    .then(createTopicTable)
    .then(createArticleTable)
    .then(createArticleHistoryTable);
};

exports.down = (knex, Promise) =>
  Promise.mapSeries(["article_history", "article", "topic", "user"], tableName =>
    knex.dropTableIfExists(tableName)
  );
