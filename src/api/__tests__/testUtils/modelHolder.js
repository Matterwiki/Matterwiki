/**
 * A store that holds model values that can be shared within test suites
 * Stuff like users, tokens are store here
 */

let userStore = {
  users: [],
  admin: null
};

let tokenStore = {
  user: null,
  admin: null
};

module.exports = {
  userHolder: {
    set: newUsers => (userStore = newUsers),
    get: () => userStore,
    getUsers: () => userStore.users,
    setUsers: newUsers => (userStore.users = newUsers),
    getAdmin: () => userStore.admin,
    setAdmin: newAdmin => (userStore.admin = newAdmin)
  },
  tokenHolder: {
    set: newTokens => (tokenStore = newTokens),
    get: () => tokenStore,
    getAdminToken: () => tokenStore.admin,
    setAdminToken: adminToken => (tokenStore.admin = adminToken),
    getUserToken: () => tokenStore.user,
    setUserToken: userToken => (tokenStore.user = userToken)
  }
};
