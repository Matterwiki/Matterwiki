const Model = require("objection").Model;
const withDBHelpers = require("./withDBHelpers");
const { ARTICLE_HISTORY_TYPES } = require("../utils/constants");

class Article extends Model {
  static get tableName() {
    return "article";
  }

  static get relationMappings() {
    const TopicModel = require("./topicModel").Model;
    const ArticleHistoryModel = require("./articleHistoryModel").Model;
    const UserModel = require("./userModel").Model;

    return {
      topic: {
        relation: Model.BelongsToOneRelation,
        modelClass: TopicModel,
        join: {
          from: "article.topic_id",
          to: "topic.id"
        }
      },
      createdUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "article.created_by_id",
          to: "user.id"
        }
      },
      modifiedUser: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "article.modified_by_id",
          to: "user.id"
        }
      },
      articleHistory: {
        relation: Model.HasManyRelation,
        modelClass: ArticleHistoryModel,
        join: {
          from: "article.id",
          to: "article_history.article_id"
        }
      }
    };
  }
}

const extraHelpers = {
  /**
   * Sets a simple `WHERE LIKE` query on model
   * Models have to implement their own search methods with the fields that need to be used
   */
  search: searchString => {
    // TODO :(
    const escapedString = `%${searchString}%`;

    return (
      Article.query()
        .where("title", "like", escapedString)
        // TODO change when we use MySQL's json type to store editor data
        .orWhere("content", "like", escapedString)
        .orWhere("change_log", "like", escapedString)
    );
  },
  /**
   * Helps insert an archive for a corresponding article
   */
  insertWithArchive: item => {
    const articleHistory = {
      articleHistory: Object.assign(
        {
          type: ARTICLE_HISTORY_TYPES.CREATE
        },
        item
      )
    };
    const graphToInsert = Object.assign({}, item, articleHistory);

    return Article.query().insertGraph(graphToInsert);
  }
};

module.exports = withDBHelpers(Article, extraHelpers, {
  relations: "[createdUser, topic]"
});
