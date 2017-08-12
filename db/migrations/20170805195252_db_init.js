exports.up = knex => {
  /**
   * Helper to add meta fields to table
   */
  const addMetaFieldsTo = table => {
    table.integer("created_by_id").unsigned().references("user.id");
    table.integer("modified_by_id").unsigned().references("user.id");
    table.boolean("is_active").notNullable().defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("modified_at").defaultTo(knex.fn.now()).notNullable();
  };

  const createUserTable = () =>
    knex.schema.createTableIfNotExists("user", table => {
      table.increments().primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("password").notNullable();
      table.string("about").notNullable();
      table.enu("role", ["ADMIN", "USER"]).notNullable();
      table.boolean("is_active").notNullable().default(true);
      table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
      table.timestamp("modified_at").defaultTo(knex.fn.now()).notNullable();
    });

  const createTopicTable = () =>
    knex.schema.createTable("topic", table => {
      table.increments().primary();
      table.string("name").notNullable();
      table.string("description").notNullable();
      addMetaFieldsTo(table);
    });

  const createArticleTable = () =>
    knex.schema.createTableIfNotExists("article", table => {
      table.increments().primary();
      table.string("title").notNullable();
      table.text("content").notNullable();
      table.string("change_log").notNullable();
      table.integer("topic_id").unsigned().references("topic.id").notNullable();
      addMetaFieldsTo(table);
    });

  const createArticleHistoryTable = () =>
    knex.schema.createTableIfNotExists("article_history", table => {
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
      table.integer("topic_id").unsigned().references("topic.id");
      addMetaFieldsTo(table);
    });

  return createUserTable()
    .then(createTopicTable)
    .then(createArticleTable)
    .then(createArticleHistoryTable);
};

exports.down = (knex, Promise) =>
  Promise.mapSeries(
    ["article_history", "article", "topic", "user"],
    tableName => knex.dropTableIfExists(tableName)
  );
