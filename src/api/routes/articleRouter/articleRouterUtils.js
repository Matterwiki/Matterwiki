const { has, isEmpty } = require("lodash");

const validateArticle = ({ title, content, topic_id }) => !!title && !!content && !!topic_id;

const validateArticleDuringUpdate = body =>
  ["title", "content", "topic_id", "change_log"].reduce((acc, f) => {
    if (has(body, f)) return acc && !isEmpty(body[f]);

    return acc;
  }, true);

module.exports = { validateArticle, validateArticleDuringUpdate };
