const Chance = require("chance");
const HttpStatus = require("http-status-codes");
const Promise = require("bluebird");

const verifyNotFoundBehaviour = require("../../sharedBehaviours/verifyRouteNotFound.behaviour");
const {
  setupAll,
  setupEach,
  tearDownAll,
  tearDownEach
} = require("../../testUtils/globalSetupTeardown");
const { userStore } = require("../../testUtils/dataStore");
const { apiClient } = require("../../testUtils/testUtils");
const { DEFAULT_PASSWORD } = require("../../testConstants");

const { INVALID_LOGIN_DATA } = require("../../../validationErrors");
const { INVALID_LOGIN_CREDENTIALS } = require("../../../apiErrors");

const chance = new Chance();

describe("Auth/Login tests", () => {
  const apiUrl = "/api/auth/login";

  beforeAll(setupAll);
  beforeEach(setupEach);
  afterAll(tearDownAll);
  afterEach(tearDownEach);

  verifyNotFoundBehaviour(apiUrl, ["GET", "PUT", "DELETE"]);

  describe("#POST /api/auth/login", () => {
    it("(400) email and password are required", () =>
      Promise.each([null, undefined, ""], falsyValue =>
        apiClient
          .post(apiUrl)
          .send({
            // TODO check either or situation.. {email: null, password: duifgerbv329} and {email: goodemail@ex.com, password: null}
            email: falsyValue,
            password: falsyValue
          })
          .expect(HttpStatus.BAD_REQUEST)
          .then(res => {
            expect(res.body.error).toEqual(INVALID_LOGIN_DATA);
          })
      ));

    it("(401) user with provided email not found", () =>
      apiClient
        .post(apiUrl)
        .send({
          // random email address
          email: chance.email(),
          password: DEFAULT_PASSWORD
        })
        .expect(HttpStatus.UNAUTHORIZED)
        .then(res => {
          // NOTE: Ambiguous error messaging.. we shouldn't be too wordy about all this
          expect(res.body.error).toEqual(INVALID_LOGIN_CREDENTIALS);
        }));

    it("(401) provided password is incorrect", () =>
      apiClient
        .post(apiUrl)
        .send({
          email: userStore.getUsers()[0].email,
          password: chance.word({ length: 8 })
        })
        .expect(HttpStatus.UNAUTHORIZED)
        .then(res => {
          // NOTE: Ambiguous error messaging.. we shouldn't be too wordy about all this
          expect(res.body.error).toEqual(INVALID_LOGIN_CREDENTIALS);
        }));

    it("(201) user can login successfully", () => {
      const expectedUser = userStore.getUsers()[0];

      return apiClient
        .post(apiUrl)
        .send({
          email: expectedUser.email,
          password: DEFAULT_PASSWORD
        })
        .expect(HttpStatus.CREATED)
        .then(res => {
          expect(res.body).toBeDefined();

          expect(res.body.id).toEqual(expectedUser.id);
          expect(res.body.email).toEqual(expectedUser.email);
          expect(res.body.about).toEqual(expectedUser.about);
          expect(res.body.name).toEqual(expectedUser.name);
          expect(res.body.role).toEqual(expectedUser.role);

          // Should not return sensitive information
          expect(res.body.singleUseToken).toBeUndefined();
          expect(res.body.password).toBeUndefined();

          // Should get auth token
          expect(res.body.authToken).toBeDefined();
        });
    });
  });
});
