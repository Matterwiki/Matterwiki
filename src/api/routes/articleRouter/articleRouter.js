const express = require("express");
const { assign } = require("lodash");

const router = express.Router();

const { JSONParser } = require("../../middleware/bodyParser");
const checkAuth = require("../../middleware/checkAuth");
const { checkIfAdmin } = require("../../middleware/checkRole");
const filterMetaData = require("../../middleware/filterMetadata");

const { DEFAULT_CHANGELOG_MESSAGE } = require("../../utils/constants");
const { NOT_FOUND } = require("../../utils/constants").ERRORS;

const archivesRouter = require("./archivesRouter.js");

const ArticleModel = require("../../models/articleModel");

const fetchArticles = async (req, res, next) => {
  try {
    const articles = await ArticleModel.getAllWithRels();
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

const fetchArticleById = async (req, res, next) => {
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
};

const saveArticle = async (req, res, next) => {
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
};

const updateArticle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const updatedArticle = await ArticleModel.updateWithHistory(id, req.body);

    res.status(200).json(updatedArticle);
  } catch (err) {
    next(err);
  }
};

const deleteArticle = async (req, res, next) => {
  const { id } = req.params;

  try {
    await ArticleModel.deleteWithHistory(id);
    res.status(200).json({});
  } catch (err) {
    next(err);
  }
};

// All `article` routes need auth
router.use(checkAuth);

router.get("/", fetchArticles);
router.get("/:id", fetchArticleById);

router.post("/", JSONParser, filterMetaData, saveArticle);
router.put("/:id", JSONParser, filterMetaData, updateArticle);

// ONLY Admins can delete articles
router.delete("/:id", checkIfAdmin, deleteArticle);

// Archive stuff
router.use("/:id/archives", archivesRouter);

module.exports = router;
