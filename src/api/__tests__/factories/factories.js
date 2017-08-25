const topicFactory = require("./topicFactory");
const userFactory = require("./userFactory");
const articleFactory = require("./articleFactory");

module.exports = {
  topic: topicFactory,
  user: userFactory,
  article: articleFactory
};
