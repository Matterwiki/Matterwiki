const express = require('express')
const path = require('path')
const helmet = require('helmet')
const compression = require('compression')
const { Model } = require('objection')

const { initDbConnection } = require('./common/utils/index')
const { errorHandler } = require('./common/middleware/index')

// Setup file storage path, so it can be used during uploads
// TODO: Stuff will change when we have S3 and other integrations
process.env.FILE_STORAGE_PATH = path.join(__dirname, 'public')

const apiRouter = require('./router')

// Setup DB connection and objection ORM
const knex = initDbConnection()
Model.knex(knex)

const app = express()

app.use(helmet())
app.use(compression())

app.use('/api', apiRouter)

// Serve static files from the static directory
// TODO: Stuff will change when we have S3 and other integrations
app.use('/static', express.static(process.env.FILE_STORAGE_PATH))

// Global error handling
// TODO https://www.joyent.com/node-js/production/design/errors
app.use(errorHandler)

module.exports = app
