const Model = require("objection").Model;
const withDBHelpers = require("./withDBHelpers");

class UserModel extends Model {
  static get tableName() {
    return "user";
  }

  static relationMappings = {
    createdArticle: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/articleModel`,
      join: {
        from: `user.id`,
        to: `article.created_by_id`
      }
    },
    modifiedArticle: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/articleModel`,
      join: {
        from: `user.id`,
        to: `article.modified_by_id`
      }
    },
    createdTopic: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/topicModel`,
      join: {
        from: `user.id`,
        to: `topic.created_by_id`
      }
    },
    modifiedTopic: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/topicModel`,
      join: {
        from: `user.id`,
        to: `topic.modified_by_id`
      }
    },
    createdArticleHistory: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/articleHistory`,
      join: {
        from: `user.id`,
        to: `article_history.created_by_id`
      }
    },
    modifiedArticleHistory: {
      relation: Model.HasManyRelation,
      modelClass: `${__dirname}/topicModel`,
      join: {
        from: `user.id`,
        to: `article_history.modified_by_id`
      }
    }
  };
}

module.exports = withDBHelpers(UserModel);
