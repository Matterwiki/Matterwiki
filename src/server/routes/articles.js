const express = require("express");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const checkAuth = require("../middleware/checkAuth");
const { checkIfAdmin } = require("../middleware/checkRole");

const { NOT_FOUND } = require("../utils/constants").ERRORS;
const { ADMIN } = require("../utils/constants").ROLES;

const articleModel = require("../models/article");
const userModel = require("../models/user");
const topicModel = require("../models/topic");
const archiveModel = require("../models/archive");

const fetchArticles = async (req, res, next) => {
  const { limit } = req.query;

  try {
    // `getAllArticles` is an override, check articleModel
    const articles = await articleModel.getAllArticles(limit);
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

const fetchArticleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    let article = await articleModel.get({ id });

    if (!article)
      return next({
        status: 404,
        code: NOT_FOUND.code,
        message: NOT_FOUND.message
      });

    article = article.toJSON();

    // NOTE This is not RESTful. Generally, articles endpoints should ONLY return articles.
    // TODO Make the client request for these resources
    article.topic = await topicModel.get({ id: article.topic_id });
    article.user = await userModel.get({ id: article.user_id });

    res.status(200).json(article);
  } catch (err) {
    next(err);
  }
};

const saveArticle = async (req, res, next) => {
  const { title, body, topic_id } = req.body;
  const { user } = req;
  try {
    const newArticle = await articleModel.post({
      title,
      body,
      topic_id,
      user_id: user.id,
      what_changed: "Another drop in the ocean of knowledge"
    });

    res.status(200).json(newArticle);
  } catch (err) {
    next(err);
  }
};

const updateArticle = async (req, res, next) => {
  const { id } = req.params;
  const { title, body, topic_id, what_changed } = req.body;
  const { user } = req;

  try {
    const updatedArticle = await articleModel.put(
      { id },
      {
        title,
        body,
        topic_id,
        what_changed,
        user_id: user.id
      }
    );

    // TODO Doesn't seem RESTful for some reason
    await archiveModel.post({
      article_id: id,
      title,
      body,
      what_changed,
      user_id: user.id
    });

    res.status(200).json(updatedArticle);
  } catch (err) {
    next(err);
  }
};

const deleteArticle = async (req, res, next) => {
  const { id } = req.params;

  try {
    await articleModel.delete({ id });
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

const fetchArchivesByArticle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const articles = await archiveModel.getAll({ article_id: id });

    if (!articles)
      return next({
        status: 404,
        code: NOT_FOUND.code,
        message: NOT_FOUND.message
      });

    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

const fetchArchiveById = async (req, res, next) => {
  const { id, archiveId } = req.params;
  try {
    let archive = await archiveModel.get({ id: archiveId, article_id: id });

    if (!archive)
      return next({
        status: 404,
        code: NOT_FOUND.code,
        message: NOT_FOUND.message
      });

    archive = archive.toJSON();

    // NOTE This is not RESTful. Generally, articles endpoints should ONLY return articles.
    // TODO Make the client request for these resources
    archive.user = await userModel.get({ id: archive.user_id });

    res.status(200).json(archive);
  } catch (err) {
    next(err);
  }
};

// All `article` routes need auth
router.use(checkAuth);

router.get("/", fetchArticles);
router.get("/:id", fetchArticleById);

router.post("/", JSONParser, saveArticle);
router.put("/:id", JSONParser, updateArticle);

// ONLY Admins can delete articles
router.delete("/:id", checkIfAdmin, deleteArticle);

// Archive stuff
// TODO Move these into a sub-route if things get hairy
router.get("/:id/archives", fetchArchivesByArticle);
router.get("/:id/archives/:archiveId", fetchArchiveById);

module.exports = router;
