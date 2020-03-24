import _get from 'lodash/get'
import createStore from './create-store'
import userApi from '../utils/user-api'

/**
 * Store that holds auth related methods and data
 */
export const [useAuthStore, authStoreApi] = createStore((set, get) => ({
    currentUser: {},

    /**
     * Checker to verify if current user is an admin!
     */
    isAdmin() {
        return _get(get().currentUser, 'role') === 'ADMIN'
    },

    /**
     * Shortcut to set currentUser state
     * @param {*} currentUser
     */
    setCurrentUser(currentUser) {
        set(state => {
            state.currentUser = currentUser
        })
    },

    /**
     * Gets the auth token from localStorage
     */
    getToken() {
        return window.localStorage.getItem('matterwiki-auth-token')
    },

    /**
     * Method to call API's login and persist user info
     *
     * @param {any} payload - Check `userApi.login` for info about this payload
     */
    async login(payload) {
        const { token, ...currentUser } = await userApi.login(payload)

        window.localStorage.setItem('matterwiki-auth-token', token)
        get().setCurrentUser(currentUser)
    },

    /**
     * Method that clears all user information in our local store
     */
    logout() {
        window.localStorage.removeItem('matterwiki-auth-token')
        get().setCurrentUser(null)
    },

    /**
     * Method to verify if the user is authenticated
     */
    async verifyAuth() {
        const currentUser = await userApi.verify()
        get().setCurrentUser(currentUser)
    },
}))
