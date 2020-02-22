const test = require('ava')
const dream = require('dreamjs')
const { pick } = require('lodash')

const { USER_ROLES } = require('../user-constants')
const { createJwt } = require('../user-utils')
const UserModel = require('../user-model')

dream.customType('user-password', helper => helper.chance.word({ length: 20 }))
dream.customType(
    'user-email',
    helper => `${helper.chance.word({ length: 15 })}@example.com`,
)

exports.makeUserData = function makeUserData(num = 1) {
    return dream
        .schema({
            name: 'name',
            email: 'user-email',
            password: 'user-password',
            about: 'sentence',
        })
        .generateRnd(num)
        .output()
}

exports.makePasswordUpdatePayload = function makePasswordUpdatePayload() {
    return dream
        .schema({
            currentPassword: 'user-password',
            newPassword: 'user-password',
        })
        .generateRnd(1)
        .output()
}

exports.makeLoginPayload = function() {
    return pick(exports.makeUserData(), ['email', 'password'])
}
exports.makeUpdatePayload = function() {
    return pick(exports.makeUserData(), ['name', 'email', 'about'])
}

exports.createAdmin = async function createAdmin(overrides = {}) {
    const data = Object.assign(exports.makeUserData(), overrides)
    const fakeAdmin = await UserModel.createUser(
        { ...data, role: USER_ROLES.ADMIN },
        true,
    )

    return fakeAdmin
}

exports.createRegularUser = async function createRegularUser(overrides = {}) {
    const data = Object.assign(exports.makeUserData(), overrides)
    const fakeUser = await UserModel.createUser(
        { ...data, role: USER_ROLES.USER },
        true,
    )

    return fakeUser
}

/**
 * Shorthand for creating admins, regular users and their auth tokens
 *
 * Sets up `t.context.users` and `t.context.tokens`.
 * - `t.context.users` had the following properties: `adminData`, `user1Data`, `user2Data`, `admin`, `user1`, `user2`
 * - `t.context.tokens` had the following properties: `admin`, `user1`, `user2`
 *
 */
exports.testUserSetup = function testUserSetup() {
    test.beforeEach(async t => {
        const [adminData, user1Data, user2Data] = exports.makeUserData(3)

        t.context.users = {
            adminData,
            user1Data,
            user2Data,
            admin: await exports.createAdmin(adminData),
            user1: await exports.createRegularUser(user1Data),
            user2: await exports.createRegularUser(user2Data),
        }

        t.context.tokens = {
            admin: createJwt(t.context.users.admin),
            user1: createJwt(t.context.users.user1),
            user2: createJwt(t.context.users.user2),
        }
    })
}
