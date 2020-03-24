import _sortBy from 'lodash/sortBy'
import _find from 'lodash/find'

import { createStore } from '@/common/store'
import { userApi } from '@/common/utils'

/**
 * User store that holds info for managing user information.
 * Looking for authenticated user, etc? Search for `auth-store`!
 */
const [useUserStore] = createStore((set, get) => ({
    userList: [],

    /**
     * Checks if passed in userId is an admin
     * @param {*} id
     */
    isAdmin(id) {
        const user = get().find(id)
        return !user || user.role === 'ADMIN'
    },

    /**
     * Given an id, finds a user in a list
     * @param {*} id
     */
    find(id) {
        return _find(get().userList, u => u.id.toString() === id)
    },

    /**
     * Fetches all users
     */
    async getList() {
        const userList = await userApi.getList()
        set(state => {
            state.userList = userList
        })
    },

    /**
     * Creates user and updates userList
     * @param {*} user
     */
    async create(user) {
        const newUser = await userApi.create(user)
        set(state => {
            state.userList.push(newUser)

            // (re)sort list by name
            // TODO: Rethink if this becomes a perf problem.
            state.userList = _sortBy(state.userList, [
                user => user.name.toLowerCase(),
            ])
        })
    },

    /**
     * Saves user and updates userList
     * @param {*} id
     * @param {*} user
     */
    async save(id, user) {
        const updatedUser = await userApi.update(id, user)

        set(state => {
            const index = state.userList.findIndex(
                u => u.id === parseInt(id, 10),
            )
            if (index !== -1) state.userList[index] = updatedUser
        })
    },

    /**
     * Deletes user with provided id, from the DB
     * @param {*} id
     */
    async remove(id) {
        await userApi.remove(id)

        set(state => {
            state.userList = state.userList.filter(u => u.id !== id)
        })
    },
}))

export default useUserStore
