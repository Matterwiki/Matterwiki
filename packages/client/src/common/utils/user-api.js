import _pick from 'lodash/pick'

import api from './api'

const userApi = {
    /**
     * Creates an admin user
     *
     * 📝 There is no store fn for this because this data is not persisted.
     *
     * @param {object} user
     * @param {string} user.name
     * @param {string} user.email
     * @param {string} user.about
     * @param {string} user.password
     */
    createAdmin(user) {
        return api()
            .url('user/admin')
            .post(_pick(user, ['name', 'email', 'about', 'password']))
            .res(res => res)
    },

    /**
     * Creates a regular user
     *
     * @param {object} user
     * @param {string} user.name
     * @param {string} user.email
     * @param {string} user.about
     * @param {string} user.password
     */
    create(user) {
        return api()
            .url('user')
            .post(_pick(user, ['name', 'email', 'about', 'password']))
            .json()
    },

    /**
     * Gets user list
     */
    getList() {
        return api().url('user').get().json()
    },

    /**
     * Gets one user
     * @param {number} id
     */
    getOne(id) {
        return api().url(`user/${id}`).get().json()
    },

    /**
     * Updates user
     *
     * @param {number} id
     * @param {object} user
     * @param {string} user.name
     * @param {string} [user.password=undefined]
     * @param {string} user.email
     * @param {string} user.about
     */
    update(id, { name, password, email, about }) {
        const userPayload = { name, email, about }
        if (password) userPayload.password = password

        return api().url(`user/${id}`).put(userPayload).json()
    },

    /**
     * Deletes user by id
     * @param {number} id
     */
    remove(id) {
        return api()
            .url(`user/${id}`)
            .delete()
            .res(res => res)
    },

    /**
     * Makes a login request and gets the auth token
     *
     * @param {object} user
     * @param {string} user.email
     * @param {string} user.password
     */
    login(loginPayload) {
        return api()
            .url('user/login')
            .post(_pick(loginPayload, ['email', 'password']))
            .json()
    },

    /**
     * Makes a "verify" request to the API
     */
    verify() {
        return api().url('user/verify').get().json()
    },
}

export default userApi
