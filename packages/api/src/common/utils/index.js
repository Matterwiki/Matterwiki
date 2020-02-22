const Knex = require('knex')
const HttpStatus = require('http-status-codes')

const knexConfig = require('../../../knexfile')

// A bunch of HttpError generating helpers
exports.makeHttpError = (status, err = {}) => ({ status, ...err })
exports.makeHttpBadRequest = (err = {}) => ({
    status: HttpStatus.BAD_REQUEST,
    ...err,
})

exports.initDbConnection = () => Knex(knexConfig)

exports.logger = require('./logger')
exports.validateEnvVars = require('./validate-env-vars')
exports.modelValidationWrapper = require('./model-validation-wrapper')
