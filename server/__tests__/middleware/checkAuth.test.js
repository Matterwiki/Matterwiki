const Chance = require("chance");

const { userStore, tokenStore } = require("../testUtils/dataStore");
const makeJwt = require("../testUtils/makeJwt");
const {
  setupAll,
  setupEach,
  tearDownAll,
  tearDownEach
} = require("../testUtils/globalSetupTeardown");
const checkAuth = require("../../middleware/checkAuth");
const constants = require("../../constants");
const { INVALID_TOKEN } = require("../../apiErrors");

const chance = new Chance();

describe("checkAuth middleware tests", () => {
  beforeAll(setupAll);
  afterAll(tearDownAll);

  beforeEach(setupEach);
  afterEach(tearDownEach);

  it("INVALID - token is required", done => {
    const req = {
      headers: { "x-access-token": "" }
    };

    const res = {};

    checkAuth(req, res, message => {
      expect(message).toEqual(INVALID_TOKEN);
      done();
    });
  });

  it("INVALID - token has expired");

  it("INVALID - token has an email that does not exist in the DB", done => {
    // made up token
    const token = makeJwt({
      id: 0,
      email: chance.email(),
      meta: {},
      role: constants.ROLES.ADMIN
    });

    const req = {
      headers: { "x-access-token": token }
    };

    const res = {};

    checkAuth(req, res, message => {
      expect(message).toEqual(INVALID_TOKEN);
      done();
    });
  });

  it("VALID - user object is set in the req object", done => {
    const req = {
      headers: { "x-access-token": tokenStore.getAdminToken() }
    };

    const res = {};

    checkAuth(req, res, () => {
      expect(req.user).toBeDefined();
      expect(req.user).toEqual(userStore.getAdmins()[0]);

      done();
    });
  });
});
