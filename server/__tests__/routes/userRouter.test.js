const HttpStatus = require("http-status-codes");
const Promise = require("bluebird");

const { apiClient } = require("../testUtils/testUtils");
const { userStore, tokenStore } = require("../testUtils/dataStore");
const {
  setupAll,
  tearDownAll,
  tearDownEach
} = require("../testUtils/globalSetupTeardown");
const verifyUnauthenticatedBehaviour = require("../sharedBehaviours/verifyUnAuthenticated.behaviour");

const { ROLES } = require("../../constants");

describe("User API tests", () => {
  const apiUrl = "/api/user/";

  beforeAll(setupAll);
  beforeEach();
  afterAll(tearDownAll);
  afterEach(() =>
    // remove users after each test; keepUsers is set to false
    tearDownEach(false)
  );

  verifyUnauthenticatedBehaviour(apiUrl);

  describe("#POST - /api/user", () => {
    it("(403) regular users are not allowed access", () => {});

    Promise.each(["name", "email", "role"], field => {
      it(`(400) ${field} is required`);
    });

    it("(409) user with email already exists");

    it("(201) user is created with the expected fields");

    it("(201) returned response has the expected fields");
  });

  describe("#GET - /api/user");
  describe("#GET - /api/user/:id");
  describe("#PUT - /api/user/:id");
  describe("#DELETE - /api/user/:id");
});
