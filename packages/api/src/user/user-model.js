const bcrypt = require('bcryptjs')
const { Model, raw } = require('objection')

const { SALT_ROUNDS, USER_ROLES } = require('./user-constants')

class UserModel extends Model {
    static get tableName() {
        return 'user'
    }

    static get modifiers() {
        return {
            /**
             * A smaller subset of user fields, to sent with related entities
             * @param {*} builder
             */
            liteSelector(builder) {
                builder.select('id', 'name', 'email', 'about')
            },
        }
    }

    static get relationMappings() {
        // https://vincit.github.io/objection.js/guide/relations.html#require-loops
        const ArticleModel = require('../article/article-model')

        return {
            createdArticle: {
                relation: Model.HasManyRelation,
                modelClass: ArticleModel,
                join: {
                    from: `user.id`,
                    to: `article.createdById`,
                },
            },
            modifiedArticle: {
                relation: Model.HasManyRelation,
                modelClass: ArticleModel,
                join: {
                    from: `user.id`,
                    to: `article.modifiedById`,
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
    static fetchUsers() {
        return this.query()
    }

    /**
     * Gets the user by id
     * @param {number} id
     * @returns
     */
    static fetchUserById(id) {
        return this.query().findById(id)
    }

    /**
     * Fetches a list of users based on the filters provided
     *
     * @param {object} [filters={}] Filters to apply on the query
     * @param {string} [filters.orderField] - Could be 'name' / 'modifiedAt' / 'createdAt'
     * @param {string} [filters.orderStyle] - Could be 'asc'/'desc'
     * @param {string} [filters.searchTerm]
     * @param {boolean} [filters.paging] - If `false` paging is disabled.
     * @param {string} [filters.pageSize] - How many records per page?
     * @param {string} [filters.pageNo] - Page number to fetch.
     */
    static async fetchUserList(filters) {
        const { orderField, orderStyle, searchTerm, paging, pageSize, pageNo } =
            filters || {}

        const resultSet = await this.query()
            .select(
                'id',
                'name',
                'email',
                'about',
                'modifiedAt',
                'createdAt',
                'role',
            )
            // Search term modifier
            .modify(qb => {
                if (searchTerm) {
                    const rawQuery = () =>
                        raw("MATCH(`name`,`about`) AGAINST('??')", searchTerm)
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
     * Fetch the count of users that have the same email, verbatim.
     * Ideally, there should only be one.
     *
     * @static
     * @param {string} name
     * @param {string} exceptId - exclude an id from the list
     * @returns
     * @memberof ArticleModel
     */
    static fetchExistingCountByEmail(email, exceptId) {
        return this.query()
            .where('email', email)
            .modify(qb => {
                if (exceptId) {
                    qb.whereNot('id', exceptId)
                }
            })
            .resultSize()
    }

    /**
     * Gets the user by email
     * @param {string} email
     * @returns
     */
    static async fetchUserByEmail(email) {
        return this.query().findOne('email', email)
    }

    /**
     * Gets the sole admin user
     * @returns
     */
    static async fetchAdmin() {
        const [user] = await this.query().where('role', USER_ROLES.ADMIN)
        return user
    }

    /**
     * Inserts a user into the db
     *
     * @param {object} user
     * @param {string} user.name
     * @param {string} user.about
     * @param {string} user.email
     * @param {string} user.password
     * @param {string} user.role
     * @param {boolean} [fetchUser=true] - Indicates if the user must be fetched or not
     * @returns
     */
    static async createUser(
        { name, about, email, password, role },
        fetchUser = true,
    ) {
        const date = new Date()

        const inserted = await this.query()[
            fetchUser ? 'insertAndFetch' : 'insert'
        ]({
            name,
            about,
            email,
            role,
            password: await bcrypt.hash(password, SALT_ROUNDS),
            modifiedAt: date,
            createdAt: date,
        })

        return inserted
    }

    /**
     * Updates an existing user
     *
     * @param {number} id
     * @param {object} user
     * @param {string} user.name
     * @param {string} user.about
     * @param {string} user.email
     * @returns
     */
    static updateUserById(id, { name, about, email }) {
        return this.query().updateAndFetchById(id, {
            name,
            about,
            email,
            modifiedAt: new Date(),
        })
    }

    /**
     * Updates password for user, given the id
     *
     * @param {number} id
     * @param {string} newPassword
     * @returns
     */
    static async updatePasswordById(id, newPassword) {
        return this.query().updateAndFetchById(id, {
            password: await bcrypt.hash(newPassword, SALT_ROUNDS),
            modifiedAt: new Date(),
        })
    }

    /**
     * "Patches" the user, does not update meta fields.
     *
     * ⚠️Use with caution, there is not a lot of validation in this fn.
     *
     * @param {number} id
     * @param {object} fields - Fields that need to be updated
     */
    static patchUserById(id, fields) {
        return this.query().patchAndFetchById(id, fields)
    }

    /**
     * Deletes user by id
     * @param {number} id
     */
    static deleteUserById(id) {
        return this.query().deleteById(id)
    }
}

module.exports = UserModel
