/**
 * A store that holds resource values that can be shared within test suites
 * Stuff like users, tokens are stored here
 * This is a substitue for using global variables
 */

let userStoreInternal = {
  users: [],
  admins: [],
  super: null
};

let tokenStoreInternal = {
  user: null,
  admin: null,
  super: null
};

module.exports = {
  userStore: {
    set: newUsers => {
      userStoreInternal = newUsers;
    },
    get: () => userStoreInternal,
    getUsers: () => userStoreInternal.users,
    setUsers: newUsers => {
      userStoreInternal.users = newUsers;
    },
    getAdmins: () => userStoreInternal.admins,
    setAdmins: newAdmins => {
      userStoreInternal.admins = newAdmins;
    },
    getSuper: () => userStoreInternal.super,
    setSuper: newSuper => {
      userStoreInternal.super = newSuper;
    }
  },
  tokenStore: {
    set: newTokens => {
      tokenStoreInternal = newTokens;
    },
    get: () => tokenStoreInternal,
    getAdminToken: () => tokenStoreInternal.admin,
    setAdminToken: adminToken => {
      tokenStoreInternal.admin = adminToken;
    },
    getUserToken: () => tokenStoreInternal.user,
    setUserToken: userToken => {
      tokenStoreInternal.user = userToken;
    },
    getSuperToken: () => tokenStoreInternal.super,
    setSuperToken: superToken => {
      tokenStoreInternal.super = superToken;
    }
  }
};
