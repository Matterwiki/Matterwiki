const { has, isEmpty, isNumber } = require("lodash");

const validateArticle = ({ title, content, topic_id }) => !!title && !!content && !!topic_id;

function validateArticleDuringUpdate(body) {
  if (!body) return false;

  // Special treatment for integers
  const isValidTopicId = isNumber(body.topic_id);

  // For strings..
  const allFieldsValid = ["title", "content", "change_log"].reduce((acc, f) => {
    // Valid if body has that field and is not empty
    if (has(body, f)) return acc && !isEmpty(body[f]);

    return acc;
  }, isValidTopicId);

  return allFieldsValid;
}

module.exports = { validateArticle, validateArticleDuringUpdate };
