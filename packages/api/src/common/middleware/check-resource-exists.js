const { isNil } = require('lodash')
const Promise = require('bluebird')
const HttpStatus = require('http-status-codes')

const { makeHttpError } = require('../utils/index')

/**
 * Middleware function to verify if resource exists for `req.params.id`.
 * If it exists, sets it up on `req.item`.
 *
 * @param {*} queryFn - Query function that should return the item
 */
module.exports = function checkResourceExists(queryFn) {
    return async function doesResourceExist(req, res, next) {
        try {
            if (!req.params.id) return next(makeHttpError(HttpStatus.NOT_FOUND))

            const item = await Promise.resolve(queryFn(req.params.id))
            if (isNil(item)) return next(makeHttpError(HttpStatus.NOT_FOUND))

            req.item = item

            next()
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}
