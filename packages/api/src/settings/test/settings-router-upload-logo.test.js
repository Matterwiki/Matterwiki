const test = require('ava')
const path = require('path')
const HttpStatus = require('http-status-codes')
const fs = require('fs')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
    testAdminRole,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')

const dirPath = path.join(__dirname, 'public')

test.before(async t => {
    // Create test file storage directory
    await fs.promises.mkdir(dirPath)

    // Change FILE_STORAGE_PATH env var to something within the test directory
    t.context.oldFileStoragePath = process.env.FILE_STORAGE_PATH
    process.env.FILE_STORAGE_PATH = dirPath
})

testDbSetup()
testUserSetup()
testApiSetup(`/api/settings/upload-logo`)

testAuth('post')
testAdminRole('post')

test(`(201) logo uploaded successfully`, async t => {
    const logoPath = path.join(__dirname, 'test-logo.png')
    t.true(fs.existsSync(logoPath))

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .attach('logo', logoPath)

    t.is(res.status, HttpStatus.OK)

    t.true(fs.existsSync(path.join(process.env.FILE_STORAGE_PATH, 'logo.png')))
})

test.after.always(async t => {
    await fs.promises.rmdir(dirPath, { recursive: true })

    // Reset env var to og path
    process.env.FILE_STORAGE_PATH = t.context.oldFileStoragePath
})
