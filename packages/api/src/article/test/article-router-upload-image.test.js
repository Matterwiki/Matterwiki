const test = require('ava')
const path = require('path')
const HttpStatus = require('http-status-codes')
const fs = require('fs')
const sinon = require('sinon')

const { ERRORS } = require('../article-constants')

const {
    testApiSetup,
    testDbSetup,
    testAuth,
    testFileSetup,
} = require('../../common/test-utils/index')
const { testUserSetup } = require('../../user/test/user-test-utils')

test.beforeEach(t => {
    // Return fake values so fileName could be asserted
    const secsSinceEpoch = new Date().getTime()
    sinon.stub(Date.prototype, 'getTime').returns(secsSinceEpoch)

    t.context.expectedFileName = `${secsSinceEpoch}`
})

testFileSetup()
testDbSetup()
testUserSetup()
testApiSetup(`/api/article/upload-image`)

testAuth('post')

async function invalidFileTester(t, fileName) {
    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.user1)
        .attach('article-image', fileName)

    t.is(res.status, HttpStatus.BAD_REQUEST)
    t.is(res.body.error.code, ERRORS.INVALID_FILE_ERR.code)
}

test(`(400) no file`, invalidFileTester)

test(`(400) invalid file`, async t => {
    const filePath = path.join(
        __dirname,
        'test-files',
        'invalid-article-file.txt',
    )
    t.true(fs.existsSync(filePath))

    await invalidFileTester(t, filePath)
})

async function uploadTester(t, fileName, expectedExtension) {
    const expectedFileName = `${t.context.expectedFileName}.${expectedExtension}`
    const imagePath = path.join(__dirname, 'test-files', fileName)
    t.true(fs.existsSync(imagePath))

    const res = await t.context.apiClient
        .post(t.context.apiUrl)
        .set('x-access-token', t.context.tokens.user1)
        .attach('article-image', imagePath)

    t.is(res.status, HttpStatus.OK)
    t.is(res.text, expectedFileName)

    t.true(
        fs.existsSync(
            path.join(process.env.FILE_STORAGE_PATH, expectedFileName),
        ),
    )
}

test(
    `(201) png image uploaded successfully`,
    uploadTester,
    'article-image-1.png',
    'png',
)

test(
    `(201) jpg image uploaded successfully`,
    uploadTester,
    'article-image-2.jpg',
    'jpeg',
)

test.afterEach.always(() => {
    sinon.restore()
})
