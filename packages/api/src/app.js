const express = require('express')
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')
const { Model } = require('objection')

const { initDbConnection } = require('./common/utils/index')
const { errorHandler } = require('./common/middleware/index')

// Setup file storage path
// TODO: Stuff will change when we have S3 and other integrations
process.env.FILE_STORAGE_PATH = path.join(__dirname, 'public')

const appRouter = require('./router')

// Setup DB connection and objection ORM
const knex = initDbConnection()
Model.knex(knex)

const app = express()

app.use(helmet())
app.use(compression())

app.use(appRouter)

// Global error handling
// TODO https://www.joyent.com/node-js/production/design/errors
app.use(errorHandler)

module.exports = app
