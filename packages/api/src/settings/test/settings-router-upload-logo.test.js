const test = require('ava')
const path = require('path')
const HttpStatus = require('http-status-codes')
const fs = require('fs')

const { ERRORS } = require('../settings-constants')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
    testAdminRole,
    testFileSetup,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')

testFileSetup()

testDbSetup()
testUserSetup()
testApiSetup(`/api/settings/upload-logo`)

testAuth('post')
testAdminRole('post')

async function invalidFileTester(t, fileName) {
    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .attach('logo', fileName)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.INVALID_FILE_ERR.code)
}

test(`(400) no file`, invalidFileTester, null)

test(`(400) invalid file`, async t => {
    const filePath = path.join(
        __dirname,
        'test-files',
        'invalid-article-file.txt',
    )
    t.true(fs.existsSync(filePath))

    await invalidFileTester(t, filePath)
})

test(`(201) logo uploaded successfully`, async t => {
    const logoPath = path.join(__dirname, 'test-files', 'test-logo.png')
    t.true(fs.existsSync(logoPath))

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.admin)
        .attach('logo', logoPath)

    t.is(res.status, HttpStatus.OK)

    t.true(fs.existsSync(path.join(process.env.FILE_STORAGE_PATH, 'logo.png')))
})
