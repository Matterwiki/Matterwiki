const express = require("express");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const checkAuth = require("../middleware/checkAuth");
const { checkIfAdmin } = require("../middleware/checkRole");

const { DELETE_DEFAULT_TOPIC } = require("../utils/constants").ERRORS;

const topicModel = require("../models/topicModel");
const articleModel = require("../models/articleModel");

async function fetchTopics(req, res, next) {
  try {
    const topics = await topicModel.getAll();
    res.status(200).json(topics);
  } catch (err) {
    next(err);
  }
}

async function fetchTopicsById(req, res, next) {
  const { id } = req.params;
  try {
    const topic = await topicModel.get({ id });
    res.status(200).json(topic);
  } catch (err) {
    next(err);
  }
}

// TODO Duplicate checks - One way would be set the name to be a unique field in the DB
async function createTopic(req, res, next) {
  const { name, description } = req.body;

  try {
    // create the admin user
    let newTopic = {
      name,
      description
    };

    newTopic = await topicModel.post(newTopic);
    res.status(201).json(newTopic);
  } catch (err) {
    next(err);
  }
}

async function updateTopic(req, res, next) {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    let updatedTopic = {
      name,
      description
    };

    updatedTopic = await topicModel.put({ id }, updatedTopic);

    res.status(200).json(updatedTopic);
  } catch (err) {
    next(err);
  }
}

async function deleteTopic(req, res, next) {
  const { id } = req.params;

  if (id === 1) {
    return next(DELETE_DEFAULT_TOPIC);
  }

  try {
    await topicModel.delete({ id });
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
}

async function fetchArticlesByTopic(req, res, next) {
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
}

router.use(checkAuth);

router.get("/", fetchTopics);

// Admin ONLY endpoints
router.get("/:id", checkIfAdmin, fetchTopicsById);
router.post("/", checkIfAdmin, JSONParser, createTopic);
router.put("/:id", checkIfAdmin, JSONParser, updateTopic);
router.delete("/:id", checkIfAdmin, deleteTopic);

// TODO this feels a little off. Maybe there's a better way to do this?
router.get("/:topicId/articles", fetchArticlesByTopic);

module.exports = router;
