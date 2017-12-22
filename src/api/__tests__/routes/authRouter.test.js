const jwt = require("jsonwebtoken");
const HttpStatus = require("http-status-codes");

const { authSecret } = require("../../config");
const { setupAll, setupEach, teardownAll } = require("../testUtils/globalSetup");

const { userHolder } = require("../testUtils/modelHolder");
const { user: userFactory } = require("../factories/factories");
const { apiClient, testConstants } = require("../testUtils/testUtils");

const { CREDS_WRONG } = require("../../utils/constants").ERRORS;

describe("Auth API tests", () => {
  beforeAll(setupAll);
  afterAll(teardownAll);
  beforeEach(setupEach);

  describe("#POST - api/auth/login/", () => {
    const apiUrl = "/api/auth/login";

    test("(400) bad email provided", () => {
      const { email, password } = userFactory.build();

      return apiClient
        .post(apiUrl)
        .send({
          email,
          password
        })
        .expect(HttpStatus.BAD_REQUEST)
        .then(res => expect(res.body.message).toBe(CREDS_WRONG.message));
    });

    test("(400) bad password provided", () => {
      const { email } = userHolder.getUsers()[0];
      const password = "invalidpass";

      return apiClient
        .post(apiUrl)
        .send({ email, password })
        .expect(HttpStatus.BAD_REQUEST)
        .then(res => expect(res.body.message).toBe(CREDS_WRONG.message));
    });

    test("(400) user and password not provided", () =>
      apiClient
        .post(apiUrl)
        .send({})
        .expect(HttpStatus.BAD_REQUEST)
        .then(res => expect(res.body.message).toBe(CREDS_WRONG.message)));

    test("(201) login request returns expected fields", () => {
      const { email, name, id, about } = userHolder.getAdmin();
      const password = testConstants.DEFAULT_PASSWORD;

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

    test("(201) request should provide token after login", () => {
      const { email } = userHolder.getAdmin();
      const password = testConstants.DEFAULT_PASSWORD;

      return apiClient
        .post(apiUrl)
        .send({ email, password })
        .expect(201)
        .then(res => {
          expect(res.body.token).toBeDefined();

          expect(jwt.verify(res.body.token, authSecret)).toBeDefined();
        });
    });

    test("(201) request should not return password", () => {
      const user = userHolder.getUsers()[0];
      const password = testConstants.DEFAULT_PASSWORD;

      return apiClient
        .post(apiUrl)
        .send({ email: user.email, password })
        .expect(201)
        .then(res => {
          expect(res.body.password).not.toBeDefined();
        });
    });
  });

  describe("#GET - api/auth/check/", () => {
    const apiUrl = "/api/auth/check";

    test("(401) should fail if bad/missing token", () => apiClient.get(apiUrl).expect(401));

    test("(200) should authenticate if token valid", async () => {
      const { email } = userHolder.getUsers()[0];
      const password = testConstants.DEFAULT_PASSWORD;

      const { token } = await apiClient
        .post("/api/auth/login")
        .send({ email, password })
        .then(res => res.body);

      expect(token).toBeDefined();

      return apiClient
        .get(apiUrl)
        .set("x-access-token", token)
        .expect(200);
    });
  });
});
