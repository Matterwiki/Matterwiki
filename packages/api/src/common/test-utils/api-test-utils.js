const request = require('supertest')
const test = require('ava')
const { get } = require('lodash')

const app = require('../../app')

/**
 * Returns the apiUrl with the dynamic parts setup correctly
 *
 * TODO: Cleanup crude nasty string parsing to replace variables in the string 🤮
 *
 * @param {any} t
 * @param {string} apiUrl
 */
exports.parseApiUrl = function parseApiUrl(t, apiUrl) {
    const matches = apiUrl.match(/({[^{][^}]*})/gm) || []

    if (!matches.length) return apiUrl
    else {
        return matches.reduce((acc, m) => {
            const path = m.replace(/[{}]/g, '')
            return acc.replace(m, get(t.context, path))
        }, apiUrl)
    }
}

exports.apiClient = request(app)

/**
 * Setup block for api related context info
 *
 * Sets up `t.context.apiClient` and `t.context.apiUrl`
 *
 * @param {string} apiUrl URL with support for dynamic bits
 *
 * @example
 *
 * ```
 * testApiSetup('/api/user') // t.context.apiUrl -> '/api/url'
 * testApiSetup('/api/user/{users.users1.id}') // t.context.apiUrl -> `'/api/user/4'`, assuming `t.context.users.users1.id` is `4`.
 * testApiSetup('/api/user/{users.users1.id}/change-admin') // t.context.apiUrl -> `'/api/user/4/change-admin'`, assuming `t.context.users.users1.id` is `4`.
 * ```
 */
exports.testApiSetup = function testApiSetup(apiUrl) {
    test.beforeEach(t => {
        // TODO: This seems unnecessary. Why not just import it?
        t.context.apiClient = exports.apiClient
        t.context.apiUrl = exports.parseApiUrl(t, apiUrl)
    })
}
