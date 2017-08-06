const Model = require("objection").Model;
const withDBHelpers = require("./withDBHelpers");

class Article extends Model {
  static get tableName() {
    return "article";
  }

  static relationMappings = {
    topic: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/TopicModel`,
      join: {
        from: "article.topic_id",
        to: "topic.id"
      }
    },
    createdUser: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/UserModel`,
      join: {
        from: "article.created_by_id",
        to: "users.id"
      }
    },
    modifiedUser: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/UserModel`,
      join: {
        from: "article.modified_by_id",
        to: "users.id"
      }
    },
    articleHistory: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/ArticleHistoryModel`,
      join: {
        from: "articles.id",
        to: "archives.article_id"
      }
    }
  };
}

module.exports = withDBHelpers(Article);
