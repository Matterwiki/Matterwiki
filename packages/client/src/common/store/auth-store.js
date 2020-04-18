import { withStringPicker, createStore } from './store-utils'
import userApi from '../utils/user-api'

/**
 * Store that holds auth related methods and data
 */
const [useStore, authStoreApi] = createStore((set, get) => ({
    currentUser: {},

    /**
     * Shortcut to set currentUser state
     * @param {*} currentUser
     */
    setCurrentUser(currentUser) {
        set(state => {
            state.currentUser = currentUser
            if (state.currentUser) {
                state.currentUser.isAdmin = currentUser.role === 'ADMIN'
            }
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

const useAuthStore = withStringPicker(useStore)
export { authStoreApi, useAuthStore }
