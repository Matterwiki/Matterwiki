const { Model } = require('objection')

class ArticleHistoryModel extends Model {
    static get tableName() {
        return 'articleHistory'
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
                qb.select(
                    'id',
                    'title',
                    'modifiedAt',
                    'createdAt',
                    'articleId',
                    'type',
                )
            },
            fullSelector(qb) {
                qb.select(
                    'id',
                    'title',
                    'content',
                    'changeLog',
                    'modifiedAt',
                    'createdAt',
                    'type',
                )
            },
        }
    }

    static get relationMappings() {
        // https://vincit.github.io/objection.js/guide/relations.html#require-loops
        const TopicModel = require('../topic/topic-model')
        const UserModel = require('../user/user-model')
        const ArticleModel = require('../article/article-model')

        return {
            article: {
                relation: Model.BelongsToOneRelation,
                modelClass: ArticleModel,
                join: {
                    from: 'articleHistory.articleId',
                    to: 'article.id',
                },
            },
            topic: {
                relation: Model.BelongsToOneRelation,
                modelClass: TopicModel,
                join: {
                    from: 'articleHistory.topicId',
                    to: 'topic.id',
                },
            },
            createdByUser: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: 'articleHistory.createdById',
                    to: 'user.id',
                },
            },
            modifiedByUser: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: 'articleHistory.modifiedById',
                    to: 'user.id',
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
    static fetchArticleHistory() {
        return this.query()
    }

    /**
     * Gets the article history item, by id
     * @param {number} articleId - Filter by articleId, just to be safe
     * @param {number} id
     * @returns
     */
    static fetchHistoryByHistoryId(articleId, id) {
        return this.query()
            .findOne({
                articleId,
                id,
            })
            .modify('fullSelector')
            .modify('withArticleRels')
    }

    /**
     * Gets the article history by article id
     * @param {number} articleId
     * @param {object} filters
     * @param {boolean} [filters.paging] - If `false` paging is disabled.
     * @param {string} [filters.pageSize] - How many records per page?
     * @param {string} [filters.pageNo] - Page number to fetch.
     * @returns
     */
    static fetchHistoryByArticleId(articleId, filters) {
        const { paging, pageSize, pageNo } = filters || {}

        return (
            this.query()
                .where('articleId', articleId)
                .modify('liteSelector')
                .modify('withArticleRels')
                .orderBy('modifiedAt', 'desc')
                // Paging modifier
                .modify(qb => {
                    if (paging) qb.page(pageNo, pageSize)
                })
        )
    }
}

module.exports = ArticleHistoryModel
