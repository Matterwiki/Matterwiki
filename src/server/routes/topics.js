const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const topicModel = require("../models/topic");
const articleModel = require("../models/article");

const fetchTopics = async (req, res, next) => {
  try {
    const topics = await topicModel.getAll();
    res.status(200).json(topics);
  } catch (err) {
    next(err);
  }
};

const fetchArticlesByTopic = async (req, res, next) => {
  const { topicId } = req.params;
  const { limit } = req.query;

  try {
    // TODO Make these using the `withRelated` API
    // TODO Doesn't seem RESTful, this. Needs more research
    const articles = await articleModel.getAllArticles(
      { topic_id: topicId },
      limit
    );

    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

router.use(checkAuth);

router.get("/", fetchTopics);
// TODO this feels a little off. Maybe there's a better way to do this?
router.get("/:topicId/articles", fetchArticlesByTopic);

module.exports = router;
