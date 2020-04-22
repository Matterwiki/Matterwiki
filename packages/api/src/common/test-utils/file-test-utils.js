const test = require('ava')
const path = require('path')
const fs = require('fs')

const dirPath = path.join(__dirname, 'public')

/**
 * Sets up a local test specific file storage directory for the lifecycle of the tests
 */
exports.testFileSetup = function testFileSetup() {
    test.before(async t => {
        // Create test file storage directory
        await fs.promises.mkdir(dirPath)

        // Change FILE_STORAGE_PATH env var to something within the test directory
        t.context.oldFileStoragePath = process.env.FILE_STORAGE_PATH
        process.env.FILE_STORAGE_PATH = dirPath
    })

    test.after.always(async t => {
        await fs.promises.rmdir(dirPath, { recursive: true })

        // Reset env var to og path
        process.env.FILE_STORAGE_PATH = t.context.oldFileStoragePath
    })
}
