const express = require("express");
const { includes, isEmpty } = require("lodash");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const checkAuth = require("../middleware/checkAuth");
const { checkIfAdmin } = require("../middleware/checkRole");

const {
  DELETE_DEFAULT_TOPIC,
  DUPLICATE_TOPIC
} = require("../utils/constants").ERRORS;

const TopicModel = require("../models/topicModel");
const ArticleModel = require("../models/articleModel");

async function fetchTopics(req, res, next) {
  try {
    const topics = await TopicModel.getAll();
    res.status(200).json(topics);
  } catch (err) {
    next(err);
  }
}

async function fetchTopicsById(req, res, next) {
  const { id } = req.params;
  try {
    const topic = await TopicModel.get(id);
    res.status(200).json(topic);
  } catch (err) {
    next(err);
  }
}

async function createTopic(req, res, next) {
  try {
    const newTopic = await TopicModel.insert(req.body);
    res.status(201).json(newTopic);
  } catch (err) {
    if (err.code === DUPLICATE_TOPIC.code) {
      return next(DUPLICATE_TOPIC);
    }

    next(err);
  }
}

async function updateTopic(req, res, next) {
  const { id } = req.params;
  try {
    const updatedTopic = await TopicModel.update(id, req.body);
    res.status(200).json(updatedTopic);
  } catch (err) {
    if (err.code === DUPLICATE_TOPIC.code) {
      return next(DUPLICATE_TOPIC);
    }

    next(err);
  }
}

async function deleteTopic(req, res, next) {
  const { id } = req.params;

  if (includes([1, 2], parseInt(id, 10))) {
    return next(DELETE_DEFAULT_TOPIC);
  }

  try {
    // check if articles are tagged to this topic
    const topicWithArticles = await TopicModel.getWithRels(id);

    if (!isEmpty(topicWithArticles.article)) {
      // tag all the articles to "topic_id: 1; uncategorized"
      // TODO could use topic relations to change this
      await ArticleModel.Model
        .query()
        .update({ topic_id: 1 })
        .where({ topic_id: id });
    }

    // now delete item
    await TopicModel.delete(id);
    res.status(200).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function fetchArticlesByTopic(req, res, next) {
  const { topicId } = req.params;

  try {
    const topicWithArticles = await TopicModel.getWithRels(topicId);
    res.status(200).json(topicWithArticles);
  } catch (err) {
    next(err);
  }
}

router.use(checkAuth);

router.get("/", fetchTopics);

// Admin ONLY endpoints
router.get("/:id", checkIfAdmin, fetchTopicsById);
router.post("/", checkIfAdmin, JSONParser, createTopic);
router.put("/:id", checkIfAdmin, JSONParser, updateTopic);
router.delete("/:id", checkIfAdmin, deleteTopic);

router.get("/:topicId/articles", fetchArticlesByTopic);

module.exports = router;
