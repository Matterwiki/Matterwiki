const { Model, raw } = require('objection')
const { snakeCase, merge } = require('lodash')

class ArticleModel extends Model {
    static get tableName() {
        return 'article'
    }

    static get modifiers() {
        return {
            withArticleRels(qb) {
                qb.withGraphFetched(
                    // Each item in this list is retrieved through one of the relations in `relationMappings`.
                    // The `liteSelector` qualifiers are modifiers in the corresponding models!
                    '[topic(liteSelector), createdByUser(liteSelector), modifiedByUser(liteSelector)]',
                )
            },
            liteSelector(qb) {
                qb.select('id', 'title', 'modifiedAt', 'createdAt')
            },
            fullSelector(qb) {
                qb.select(
                    'id',
                    'title',
                    'content',
                    'changeLog',
                    'modifiedAt',
                    'createdAt',
                )
            },
        }
    }

    static get relationMappings() {
        // https://vincit.github.io/objection.js/guide/relations.html#require-loops
        const TopicModel = require('../topic/topic-model')
        const UserModel = require('../user/user-model')
        const ArticleHistoryModel = require('../article-history/article-history-model')

        return {
            topic: {
                relation: Model.BelongsToOneRelation,
                modelClass: TopicModel,
                join: {
                    from: 'article.topicId',
                    to: 'topic.id',
                },
            },
            createdByUser: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: 'article.createdById',
                    to: 'user.id',
                },
            },
            modifiedByUser: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: 'article.modifiedById',
                    to: 'user.id',
                },
            },
            articleHistory: {
                relation: Model.HasManyRelation,
                modelClass: ArticleHistoryModel,
                join: {
                    from: 'article.id',
                    to: 'articleHistory.articleId',
                },
            },
        }
    }

    //
    //
    // CUSTOM METHODS
    // These methods are not part of objection.js!
    //
    // ❓
    // These are kept here because the model file is
    // the most intuitive place to keep all these functions.
    // It essentially serves as a "data layer" for all DB concerns!
    //
    // ⚠️ Ensure that they don't clash with objection.js methods!
    //
    //

    /**
     * Returns objection's query builder.
     * If you need to get nuanced, write a custom method!
     */
    static fetchArticles() {
        return this.query()
    }

    /**
     * Gets the article by id
     * @param {number} id
     * @returns
     */
    static fetchArticleById(id) {
        return this.query()
            .findById(id)
            .modify('fullSelector')
            .modify('withArticleRels')
    }

    /**
     * Fetch the count of articles that have a title string, verbatim.
     * Ideally, there should only be one.
     *
     * @static
     * @param {string} title
     * @param {string} exceptId - exclude an id from the list
     * @returns
     * @memberof ArticleModel
     */
    static fetchExistingCountByTitle(title, exceptId) {
        return this.query()
            .where('title', title)
            .modify(qb => {
                if (exceptId) {
                    qb.whereNot('id', exceptId)
                }
            })
            .resultSize()
    }

    /**
     * Fetches a list of articles based on the filters provided
     *
     * @param {object} [filters={}] Filters to apply on the query
     * @param {string} [filters.orderField] - Could be 'title' / 'modifiedAt' / 'createdAt'
     * @param {string} [filters.orderStyle] - Could be 'asc'/'desc'
     * @param {string} [filters.searchTerm]
     * @param {string} [filters.topicId]
     * @param {boolean} [filters.paging] - If `false` paging is disabled.
     * @param {string} [filters.pageSize] - How many records per page?
     * @param {string} [filters.pageNo] - Page number to fetch.
     */
    static async fetchArticleList(filters) {
        const {
            orderField,
            orderStyle,
            searchTerm,
            topicId,
            paging,
            pageSize,
            pageNo,
        } = filters || {}

        const resultSet = await this.query()
            .modify('liteSelector')
            .modify('withArticleRels')
            // Search term modifier
            .modify(qb => {
                if (searchTerm) {
                    const rawQuery = () =>
                        raw(
                            `MATCH(??) AGAINST('??')`,
                            snakeCase('searchTokens'),
                            searchTerm,
                        )
                    qb.where(rawQuery())
                    qb.select(rawQuery().as('relevanceScore'))
                }
            })
            // topicId modifier
            .modify(qb => {
                if (topicId) qb.where('topicId', topicId)
            })
            // orderBy modifier
            .modify(qb => {
                qb.orderBy(orderField, orderStyle)
            })
            // Paging modifier
            .modify(qb => {
                if (paging) qb.page(pageNo, pageSize)
            })

        return resultSet
    }

    /**
     * Creates article in the db
     * @param {object} article
     * @param {string} article.title
     * @param {string} article.content
     * @param {string} article.changeLog
     * @param {string} article.searchTokens
     * @param {string} article.topicId
     * @param {string} article.articleHistory
     * @param {object} user
     * @returns
     * @memberof ArticleModel
     */
    static async createArticle(
        { title, content, changeLog, searchTokens, topicId, articleHistory },
        user,
    ) {
        const date = new Date()

        const meta = {
            createdById: user.id,
            modifiedById: user.id,
            modifiedAt: date,
            createdAt: date,
        }

        const inserted = await this.query().insertGraph({
            title,
            content,
            topicId,
            searchTokens,
            changeLog,
            ...meta,
            articleHistory: merge(articleHistory, meta),
        })

        return this.fetchArticleById(inserted.id)
    }

    /**
     * Updates article in the db
     *
     * @param {number} id
     * @param {object} article
     * @param {string} article.title
     * @param {string} article.content
     * @param {string} article.topicId
     * @param {object} user
     * @returns
     * @memberof ArticleModel
     */
    static async updateArticleById(
        id,
        { title, content, changeLog, searchTokens, topicId, articleHistory },
        user,
    ) {
        const date = new Date()

        await this.query()
            .update({
                title,
                content,
                topicId,
                changeLog,
                searchTokens,
                modifiedById: user.id,
                modifiedAt: date,
            })
            .where('id', id)

        const updated = await this.fetchArticleById(id)

        const { createdAt, modifiedAt, createdByUser, modifiedByUser } = updated

        // Insert articleHistory
        await this.relatedQuery('articleHistory')
            .for(id)
            .insert(
                merge(
                    {
                        createdAt,
                        modifiedAt,
                        createdById: createdByUser.id,
                        modifiedById: modifiedByUser.id,
                    },
                    articleHistory,
                ),
            )

        return updated
    }

    /**
     * "Patches" the article, does not update meta fields.
     *
     * ⚠️Use with caution, there is not a lot of validation in this fn.
     *
     * @param {number} id
     * @param {object} fields - Fields that need to be updated
     */
    static patchArticleById(id, fields) {
        return this.query().patchAndFetchById(id, fields)
    }

    /**
     * Deletes article by id
     * @param {number} id
     */
    static async deleteArticleById(id) {
        // Delete history entries before deleting article
        await this.relatedQuery('articleHistory')
            .for(id)
            .delete()

        return this.query().deleteById(id)
    }
}

module.exports = ArticleModel
