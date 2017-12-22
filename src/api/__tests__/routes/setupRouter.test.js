const { merge } = require("lodash");
const { setupAll, setupEach, teardownAll } = require("../testUtils/globalSetup");

const { apiClient } = require("../testUtils/testUtils");
const { user: userFactory } = require("../factories/factories");

const { DUPLICATE_ADMIN_USER } = require("../../utils/constants").ERRORS;
const { ADMIN_ID, ROLES } = require("../../utils/constants");

const UserModel = require("../../models/userModel");

describe("Setup API tests", () => {
  beforeAll(setupAll);
  afterAll(teardownAll);
  beforeEach(() => setupEach({ keepUsers: false }));

  const apiUrl = "/api/setup/";
  describe("#POST api/setup", () => {
    test("(409) should not create if admin already exists", async () => {
      const adminUser = merge(userFactory.build(), {
        id: 1,
        role: ROLES.ADMIN
      });

      await UserModel.query().insert(adminUser);

      return apiClient
        .post(apiUrl)
        .send(userFactory.build())
        .expect(409)
        .then(async res => {
          expect(res.body.message).toBe(DUPLICATE_ADMIN_USER.message);
        });
    });

    test("(201) should create admin user", async () => {
      const newAdminUser = userFactory.build();

      return apiClient
        .post(apiUrl)
        .send(newAdminUser)
        .expect(201)
        .then(async () => {
          const adminUser = await UserModel.query().findById(ADMIN_ID);

          expect(adminUser).toEqual(
            expect.objectContaining({
              id: ADMIN_ID,
              is_active: 1,
              about: newAdminUser.about,
              email: newAdminUser.email,
              name: newAdminUser.name,
              role: ROLES.ADMIN
            })
          );
        });
    });
  });
});
