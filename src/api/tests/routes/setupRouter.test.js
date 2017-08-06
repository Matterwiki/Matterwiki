const {
  setupAll,
  setupEach,
  teardownAll
} = require("../testUtils/globalSetup");

const { userHolder, tokenHolder } = require("../testUtils/modelHolder");
const { factories, apiClient, userHelpers } = require("../testUtils/testUtils");

const { DUPLICATE_ADMIN_USER } = require("../../utils/constants").ERRORS;
const { ADMIN_ID } = require("../../utils/constants");
const { dbManager } = require("../../utils/db");

const { makeUsers, makeJwt } = userHelpers;

describe("Setup API tests", () => {
  beforeAll(setupAll);
  afterAll(teardownAll);
  beforeEach(setupEach);

  const apiUrl = "/api/setup/";
  describe("POST api/setup", () => {
    test("409 any - INVALID - should not allow insert if admin already exists", () =>
      apiClient
        .post(apiUrl)
        .send(factories.user.build())
        .expect(409)
        .then(res =>
          expect(res.body.message).toBe(DUPLICATE_ADMIN_USER.message)
        ));
    describe("201 POST api/setup/", () => {
      // this is a block that needs an empty users table
      beforeEach(() => dbManager.truncateDb());

      // make new users and tokens, in case some other test is using this
      afterAll(() =>
        makeUsers()
          .then(testUsers => {
            userHolder.set(testUsers);
            return testUsers;
          })
          .then(testUsers => {
            const tokens = {};
            tokens.admin = makeJwt(testUsers.admin);
            tokens.user = makeJwt(testUsers.users[0]);

            tokenHolder.set(tokens);
          })
      );
      test("201 any - VALID - should create admin user", () => {
        const newAdminUser = Object.assign({}, factories.user.build(), {
          id: ADMIN_ID
        });

        return apiClient
          .post(apiUrl)
          .send(newAdminUser)
          .expect(201)
          .then(async res => {
            expect(res.body.id).toEqual(1);
            expect(res.body).toEqual(
              expect.objectContaining({
                about: newAdminUser.about,
                email: newAdminUser.email,
                name: newAdminUser.name
              })
            );
          });
      });
      test.skip("201 any - VALID - should hash password before inserting user");
    });
  });
});
