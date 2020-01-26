const { assign } = require('lodash')
const HttpStatus = require('http-status-codes')
const { RESULT_LIMITS } = require('../../utils/constants')
const ArticleModel = require('../../models/articleModel')

/**
 * Given query params, build a filter object that could be used in a where clause.
 *
 * Also (as a side effect) helps in filtering out unsupported params.
 *
 * @param {object} params
 * @param {string} params.topic_id - filter objects by topic ID
 * @param {string} params.modified_by_id - filter objects by modifiedBy ID
 * @returns
 */
function buildWhereForArticle ({ topic_id: topicId, modified_by_id: modifiedById }) {
  return assign(
    topicId ? { topic_id: parseInt(topicId, 10) } : {},
    modifiedById ? { modified_By_id: parseInt(modifiedById, 10) } : {}
  )
}

/**
 * Given a queryBuilder chain and a search string, adds extra `where` clauses to the builder that searches for provided text.
 *
 * @param {Promise} queryChain
 * @param {string} search
 * @returns
 */
function chainSearchQuery (queryBuilder, search) {
  if (!search) return queryBuilder

  const escapedString = `%${search}%`

  return (
    queryBuilder
      .andWhere('title', 'like', escapedString)
      // TODO change when we use MySQL's json type to store editor data
      .orWhere('content', 'like', escapedString)
      .orWhere('change_log', 'like', escapedString)
  )
}

/**
 * Return a sort object to be applied on the article list
 * @param {object} sortParams
 * @param {string} sort - The sort field
 * @param {string} direction - could be ascending (asc) or descending (desc)
 * @returns
 */
function buildSortObjectForArticle ({ sort, direction }) {
  // TODO clean this up a bit.. was written in 45 seconds

  const defaultSort = {
    sortField: 'updated_at',
    directionToSort: 'desc'
  }

  if (!sort) return defaultSort

  let sortField = ''
  let directionToSort = direction

  if (sort !== 'title' && sort !== 'topic_id') return defaultSort

  if (directionToSort !== 'asc' && directionToSort !== 'desc') directionToSort = 'asc'

  sortField = sort

  return { directionToSort, sortField }
}

/**
 * Actual middleware fn that is used for fetching a list of articles
 *
 * @param {any} req
 * @param {any} res
 * @param {any} next
 */
async function fetchArticles (req, res, next) {
  try {
    const filters = buildWhereForArticle(req.query)
    const { sortField, directionToSort } = buildSortObjectForArticle(req.query)

    const limit = parseInt(req.query.limit || RESULT_LIMITS.ARTICLES, 10)
    const pageNumber = parseInt(req.query.page || 1, 10)
    const pageOffset = (pageNumber - 1) * limit

    const articles = await chainSearchQuery(ArticleModel.query(), req.query.search)
      .withRels()
      .where(filters)
      .orderBy(sortField, directionToSort)
      .offset(pageOffset)
      .limit(limit)

    const totalRecords = (await chainSearchQuery(ArticleModel.query(), req.query.search).where(
      filters
    )).length
    const totalPages = Math.ceil(totalRecords / limit)
    const remainingPages = totalPages - pageNumber

    res.status(HttpStatus.OK).json({
      articles,
      meta: {
        totalRecords,
        totalPages,
        remainingPages,
        pageNumber
      }
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = fetchArticles
