const express = require("express");
const { assign } = require("lodash");

const router = express.Router();

const { JSONParser } = require("../../middleware/bodyParser");
const checkAuth = require("../../middleware/checkAuth");
const { checkIfAdmin } = require("../../middleware/checkRole");
const filterMetaData = require("../../middleware/filterMetadata");

const { DEFAULT_CHANGELOG_MESSAGE } = require("../../utils/constants");
const { NOT_FOUND } = require("../../utils/constants").ERRORS;

const historyRouter = require("./articleHistoryRouter");

const ArticleModel = require("../../models/articleModel");

async function fetchArticles(req, res, next) {
  try {
    const articles = await ArticleModel.getAllWithRels();
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
}

async function fetchArticleById(req, res, next) {
  const { id } = req.params;
  try {
    const article = await ArticleModel.getWithRels(id);

    if (!article) {
      return next(NOT_FOUND);
    }

    res.status(200).json(article);
  } catch (err) {
    next(err);
  }
}

async function saveArticle(req, res, next) {
  try {
    const articleWithChangeLog = assign({}, req.body, {
      change_log: DEFAULT_CHANGELOG_MESSAGE
    });
    const newArticle = await ArticleModel.insertWithHistory(
      articleWithChangeLog
    );

    res.status(201).json(newArticle);
  } catch (err) {
    next(err);
  }
}

async function updateArticle(req, res, next) {
  const { id } = req.params;

  try {
    const updatedArticle = await ArticleModel.updateWithHistory(id, req.body);

    res.status(200).json(updatedArticle);
  } catch (err) {
    next(err);
  }
}

async function deleteArticle(req, res, next) {
  const { id } = req.params;

  try {
    await ArticleModel.deleteWithHistory(id);
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
}

async function searchArticle(req, res, next) {
  const { query } = req.query;

  try {
    const articles = await ArticleModel.searchWithRels(query);
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
}

// All `article` routes need auth
router.use(checkAuth);

router.get("/", fetchArticles);
router.get("/search/", searchArticle);
router.get("/:id", fetchArticleById);

router.post("/", JSONParser, filterMetaData, saveArticle);
router.put("/:id", JSONParser, filterMetaData, updateArticle);

// ONLY Admins can delete articles
router.delete("/:id", checkIfAdmin, deleteArticle);

// Archive stuff
router.use("/:id/history", historyRouter);

module.exports = router;
