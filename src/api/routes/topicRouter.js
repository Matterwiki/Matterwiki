const express = require("express");
const { includes, isEmpty } = require("lodash");
const HttpStatus = require("http-status-codes");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const checkAuth = require("../middleware/checkAuth");
const { checkIfAdmin } = require("../middleware/checkRole");

const { DELETE_DEFAULT_TOPIC, DUPLICATE_TOPIC } = require("../utils/constants").ERRORS;

const TopicModel = require("../models/topicModel");
const ArticleModel = require("../models/articleModel");

async function fetchTopics(req, res, next) {
  try {
    const topics = await TopicModel.query();
    res.status(HttpStatus.OK).json(topics);
  } catch (err) {
    next(err);
  }
}

async function fetchTopicsById(req, res, next) {
  const { id } = req.params;
  try {
    const topic = await TopicModel.query().findById(id);
    res.status(HttpStatus.OK).json(topic);
  } catch (err) {
    next(err);
  }
}

async function createTopic(req, res, next) {
  try {
    const newTopic = await TopicModel.query().insertAndFetch(req.body);
    res.status(HttpStatus.CREATED).json(newTopic);
  } catch (err) {
    // TODO get more granular here
    // since this is the only kind of validation we have on emails, this is OK for now
    if (err.statusCode === HttpStatus.BAD_REQUEST && err.data.name) {
      return next(DUPLICATE_TOPIC);
    }

    next(err);
  }
}

async function updateTopic(req, res, next) {
  const { id } = req.params;
  try {
    const updatedTopic = await TopicModel.query().updateAndFetchById(id, req.body);
    res.status(HttpStatus.OK).json(updatedTopic);
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
    await ArticleModel.query()
      .where({
        topic_id: id
      })
      // Default uncategorized
      .update({ topic_id: 1 });

    await TopicModel.query().deleteById(id);
    res.status(HttpStatus.OK).json({});
  } catch (err) {
    console.log(err);
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

module.exports = router;
