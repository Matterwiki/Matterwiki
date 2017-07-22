const {
  apiClient,
  factories,
  TEST_CONSTANTS
} = require("../../testHelpers/testHelpers");
const {
  setupAll,
  setupEach,
  teardownAll
} = require("../../testHelpers/serverSetup");
const { userHolder } = require("../../testHelpers/modelHolder");
const { CREDS_WRONG } = require("../../utils/constants").ERRORS;

describe("Auth API tests", () => {
  beforeAll(setupAll);
  afterAll(teardownAll);
  beforeEach(setupEach);

  describe("POST - api/auth/login/", () => {
    const apiUrl = "/api/auth/login";
    test("401 any - INVALID - bad email provided", () => {
      const { email, password } = factories.user.build();

      return apiClient
        .post(apiUrl)
        .send({
          email,
          password
        })
        .expect(401)
        .then(res => expect(res.body.message).toBe(CREDS_WRONG.message));
    });

    test("401 any - INVALID - bad password provided", () => {
      const { email } = userHolder.getUsers()[0];
      const password = "invalidpass";

      return apiClient
        .post(apiUrl)
        .send({ email, password })
        .expect(401)
        .then(res => expect(res.body.message).toBe(CREDS_WRONG.message));
    });
    test("401 any - INVALID - user and password not provided", () =>
      apiClient
        .post(apiUrl)
        .send({})
        .expect(401)
        .then(res => expect(res.body.message).toBe(CREDS_WRONG.message)));

    test("201 any - VALID - returns expected fields", () => {
      const { email, name, id, about } = userHolder.getAdmin();
      const password = TEST_CONSTANTS.DEFAULT_PASSWORD;

      return apiClient
        .post(apiUrl)
        .send({ email, password })
        .expect(201)
        .then(res => {
          expect(res.body).toEqual(
            expect.objectContaining({
              email,
              name,
              id,
              about
            })
          );
        });
    });
    test("201 any - VALID - should provide token after login", () => {
      const { email } = userHolder.getAdmin();
      const password = TEST_CONSTANTS.DEFAULT_PASSWORD;

      return apiClient
        .post(apiUrl)
        .send({ email, password })
        .expect(201)
        .then(res => {
          expect(res.body.token).toBeDefined();
        });
    });
    test("201 any - VALID - should not return password", () => {
      const { email } = userHolder.getUsers()[0];
      const password = TEST_CONSTANTS.DEFAULT_PASSWORD;

      return apiClient
        .post(apiUrl)
        .send({ email, password })
        .expect(201)
        .then(res => {
          expect(res.body.password).not.toBeDefined();
        });
    });
  });
  describe("GET - api/auth/check/", () => {
    const apiUrl = "/api/auth/check";
    test("401 any - VALID - should fail if bad/missing token", () =>
      apiClient.get(apiUrl).expect(401));

    test("200 any - VALID - should authenticate if token valid", async () => {
      const { email } = userHolder.getUsers()[0];
      const password = TEST_CONSTANTS.DEFAULT_PASSWORD;

      const { token } = await apiClient
        .post("/api/auth/login")
        .send({ email, password })
        .then(res => res.body);

      expect(token).toBeDefined();

      return apiClient.get(apiUrl).set("x-access-token", token).expect(200);
    });
  });
});
