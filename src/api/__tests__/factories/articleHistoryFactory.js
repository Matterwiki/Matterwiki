const { assign, omit } = require("lodash");

const { ARTICLE_HISTORY_TYPES } = require("../../utils/constants");

module.exports = {
  build: (historyType = ARTICLE_HISTORY_TYPES.CREATE, article = {}) =>
    assign(
      { article_id: article.id },
      {
        type: historyType
      },
      omit(article, "id")
    )
};
