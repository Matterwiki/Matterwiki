const express = require("express");
const { assign, omit, cloneDeep } = require("lodash");
const HttpStatus = require("http-status-codes");

const router = express.Router();

const { JSONParser } = require("../../middleware/bodyParser");
const checkAuth = require("../../middleware/checkAuth");
const { checkIfAdmin } = require("../../middleware/checkRole");
const filterMetaData = require("../../middleware/filterMetadata");

const {
  DEFAULT_CHANGELOG_MESSAGE,
  ARTICLE_HISTORY_TYPES,
  ERRORS
} = require("../../utils/constants");

const articleHistoryRouter = require("./articleHistoryRouter");

const ArticleModel = require("../../models/articleModel");

const { validateArticle, validateArticleDuringUpdate } = require("./articleRouterUtils");

const fetchArticles = require("./fetchArticles");

async function fetchArticleById(req, res, next) {
  const { id } = req.params;
  try {
    const article = await ArticleModel.query()
      .findById(id)
      .withRels();

    if (!article) {
      return next(ERRORS.NOT_FOUND);
    }

    res.status(HttpStatus.OK).json(article);
  } catch (err) {
    next(err);
  }
}

async function createArticle(req, res, next) {
  try {
    if (!validateArticle(req.body)) return next(ERRORS.BAD_ARTICLE_CREATE);

    const articleToCreate = assign(req.body, {
      change_log: DEFAULT_CHANGELOG_MESSAGE
    });

    // TODO This should ideally be a separate request from the UI, make it so if saves are slow
    const articleHistory = {
      articleHistory: assign({ type: ARTICLE_HISTORY_TYPES.CREATE }, articleToCreate)
    };
    const graphToInsert = assign({}, articleToCreate, articleHistory);

    const insertedArticle = await ArticleModel.query()
      .insertGraphAndFetch(graphToInsert)
      .withRels();

    res.status(HttpStatus.CREATED).json(insertedArticle);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function updateArticle(req, res, next) {
  const { id } = req.params;

  try {
    if (!validateArticleDuringUpdate(req.body)) return next(ERRORS.BAD_ARTICLE_UPDATE);

    const updatedArticle = await ArticleModel.query()
      .updateAndFetchById(id, req.body)
      .withRels();

    const updatedArticleToSend = cloneDeep(updatedArticle);

    // TODO This should ideally be a separate request from the UI, make it so if saves are slow
    const articleHistory = assign(
      { type: ARTICLE_HISTORY_TYPES.UPDATE },
      omit(updatedArticle, ["topic", "createdByUser", "modifiedByUser"])
    );

    await updatedArticle.$relatedQuery("articleHistory").insert(articleHistory);

    res.status(HttpStatus.OK).json(updatedArticleToSend);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function deleteArticle(req, res, next) {
  const { id } = req.params;

  try {
    await ArticleModel.query().deleteById(id);
    res.status(HttpStatus.OK).json({});
  } catch (err) {
    next(err);
  }
}

// All `article` routes need auth
router.use(checkAuth);

router.get("/", fetchArticles);
router.get("/:id", fetchArticleById);

router.post("/", JSONParser, filterMetaData, createArticle);
router.put("/:id", JSONParser, filterMetaData, updateArticle);

// ONLY Admins can delete articles
router.delete("/:id", checkIfAdmin, deleteArticle);

// Archive stuff
router.use("/:id/history", articleHistoryRouter);

module.exports = router;
