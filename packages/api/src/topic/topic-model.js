const { Model, raw } = require('objection')
const Promise = require('bluebird')

class TopicModel extends Model {
    static get tableName() {
        return 'topic'
    }

    static get modifiers() {
        return {
            liteSelector(builder) {
                builder.select('id', 'name', 'description')
            },
        }
    }

    static get relationMappings() {
        // https://vincit.github.io/objection.js/guide/relations.html#require-loops
        const ArticleModel = require('../article/article-model')
        const ArticleHistoryModel = require('../article-history/article-history-model')

        return {
            article: {
                relation: Model.HasManyRelation,
                modelClass: ArticleModel,
                join: {
                    from: 'topic.id',
                    to: 'article.topicId',
                },
            },
            articleHistory: {
                relation: Model.HasManyRelation,
                modelClass: ArticleHistoryModel,
                join: {
                    from: 'topic.id',
                    to: 'articleHistory.topicId',
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
    static fetchTopics() {
        return this.query()
    }

    /**
     * Gets default topics
     */
    static fetchDefaultTopics() {
        return this.query().where('isDefault', true)
    }

    /**
     * Fetches topic by name
     * @param {string} name
     */
    static async fetchTopicByName(name) {
        return this.query().findOne({ name })
    }

    /**
     * Fetch the count of topics that have the same name, verbatim.
     * Ideally, there should only be one.
     *
     * @static
     * @param {string} name
     * @param {string} exceptId - exclude an id from the list
     * @returns
     * @memberof ArticleModel
     */
    static async fetchExistingCountByName(name, exceptId) {
        return this.query()
            .where('name', name)
            .modify(qb => {
                if (exceptId) {
                    qb.whereNot('id', exceptId)
                }
            })
            .resultSize()
    }

    /**
     * Gets the topic by id
     * @param {number} id
     * @returns
     */
    static fetchTopicById(id) {
        return this.query().findById(id)
    }

    /**
     * Fetches a list of topics based on the filters provided
     *
     * @param {object} [filters={}] Filters to apply on the query
     * @param {string} [filters.orderField] - Could be 'name' / 'modifiedAt' / 'createdAt'
     * @param {string} [filters.orderStyle] - Could be 'asc'/'desc'
     * @param {string} [filters.searchTerm]
     * @param {boolean} [filters.paging] - If `false` paging is disabled.
     * @param {string} [filters.pageSize] - How many records per page?
     * @param {string} [filters.pageNo] - Page number to fetch.
     */
    static async fetchTopicList(filters) {
        const { orderField, orderStyle, searchTerm, paging, pageSize, pageNo } =
            filters || {}

        const resultSet = await this.query()
            .select('id', 'name', 'description', 'modifiedAt', 'createdAt')
            // Search term modifier
            .modify(qb => {
                if (searchTerm) {
                    const rawQuery = () =>
                        raw(
                            "MATCH(`name`,`description`) AGAINST('??')",
                            searchTerm,
                        )
                    qb.where(rawQuery())
                    qb.select(rawQuery().as('relevanceScore'))
                }
            })
            // orderBy modifier
            .modify(qb => {
                if (searchTerm) qb.orderBy('relevanceScore', 'desc')
                else qb.orderBy(orderField, orderStyle)
            })
            // Paging modifier
            .modify(qb => {
                if (paging) qb.page(pageNo, pageSize)
            })

        return resultSet
    }

    /**
     * Inserts a topic into the db
     *
     * @param {object} topic
     * @param {string} topic.name
     * @param {string} topic.about
     * @returns
     */
    static createTopic({ name, description }) {
        const date = new Date()

        return this.query().insertAndFetch({
            name,
            description,
            modifiedAt: date,
            createdAt: date,
        })
    }

    /**
     * Updates an existing topic
     *
     * @param {number} id
     * @param {object} topic
     * @param {string} topic.name
     * @param {string} topic.description
     * @returns
     */
    static updateTopicById(id, { name, description }) {
        return this.query().updateAndFetchById(id, {
            name,
            description,
            modifiedAt: new Date(),
        })
    }

    /**
     * "Patches" the topic, does not update meta fields.
     *
     * ⚠️Use with caution, there is not a lot of validation in this fn.
     *
     * @param {number} id
     * @param {object} fields - Fields that need to be updated
     */
    static patchTopicById(id, fields) {
        return this.query().patchAndFetchById(id, fields)
    }

    /**
     * Deletes topic by id
     * @param {number} id
     */
    static async deleteTopicById(id) {
        // Change articles to "uncategorized" topic before proceeding to delete.
        const { id: uncategorisedTopicId } = await this.query().findOne(
            'name',
            'uncategorised',
        )

        await Promise.map(['article', 'articleHistory'], related => {
            return this.relatedQuery(related)
                .for(id)
                .update({
                    topicId: uncategorisedTopicId,
                })
        })

        return this.query().deleteById(id)
    }
}

module.exports = TopicModel
