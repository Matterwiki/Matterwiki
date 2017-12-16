const HttpStatus = require("http-status-codes");

const UserModel = require("../../models/userModel");
const { NO_ACCESS, DUPLICATE_USER, DELETE_DEFAULT_ADMIN } = require("../../utils/constants").ERRORS;

const { setupAll, setupEach, teardownAll } = require("../testUtils/globalSetup");
const { makeUsers } = require("../testUtils/userHelpers");
const makeJwt = require("../testUtils/makeJwt");

const { userHolder, tokenHolder } = require("../testUtils/modelHolder");
const { apiClient } = require("../testUtils/testUtils");
const { user: userFactory } = require("../factories/factories");

const testUnauthenticatedRequests = require("../sharedBehaviour/testUnauthenticatedRequests");

describe("User API tests", () => {
  let testUsers = {};
  let tokens = {};

  beforeAll(setupAll);
  afterAll(teardownAll);
  beforeEach(async () => {
    await setupEach({ keepUsers: false });

    const testUsers1 = await makeUsers();
    userHolder.set(testUsers1);

    const tokens1 = {};
    tokens1.admin = makeJwt(testUsers1.admin);
    tokens1.user = makeJwt(testUsers1.users[0]);

    tokenHolder.set(tokens1);

    testUsers = userHolder.get();
    tokens = tokenHolder.get();
  });

  const apiUrl = "/api/users/";

  testUnauthenticatedRequests(apiUrl);

  describe("#GET api/users", () => {
    test("(403) regular user not allowed to fetch items", () =>
      apiClient
        .get(apiUrl)
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.FORBIDDEN)
        .then(res => expect(res.body.message).toBe(NO_ACCESS.message)));

    test("(200) list request fetches only active items", async () => {
      const { id } = testUsers.users[0];
      await UserModel.query()
        .delete()
        .where({ id });

      return apiClient
        .get(apiUrl)
        .set("x-access-token", tokens.admin)
        .expect(HttpStatus.OK)
        .then(async res => {
          expect(res.body).toHaveLength(3);

          expect(res.body.map(u => u.id)).not.toContain(id);
        });
    });

    test("(200) list request returns expected data", () =>
      apiClient
        .get(apiUrl)
        .set("x-access-token", tokens.admin)
        .expect(HttpStatus.OK)
        .then(async res => {
          const dbUsers = await UserModel.query();
          expect(res.body).toHaveLength(dbUsers.length);

          res.body.forEach((user, i) => {
            expect(user).toEqual(
              expect.objectContaining({
                about: dbUsers[i].about,
                email: dbUsers[i].email,
                name: dbUsers[i].name,
                id: dbUsers[i].id
              })
            );

            expect(user.password).toBeUndefined();
          });
        }));
  });

  describe("#GET api/users/:id", () => {
    test("(403) regular user not allowed to fetch user", () =>
      apiClient
        .get(`${apiUrl}/1`)
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.FORBIDDEN)
        .then(res => expect(res.body.message).toBe(NO_ACCESS.message)));

    test("(200) returns expected user with expected fields", () =>
      apiClient
        .get(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .expect(HttpStatus.OK)
        .then(async res => {
          const user = await UserModel.query().findById(1);

          expect(res.body).toEqual(
            expect.objectContaining({
              about: user.about,
              email: user.email,
              name: user.name,
              id: user.id
            })
          );

          expect(res.body.password).toBeUndefined();
        }));
  });

  describe("#POST api/users/", () => {
    test("(403) regular user not allowed to create user", () =>
      apiClient
        .post(apiUrl)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .send({})
        .expect(HttpStatus.FORBIDDEN)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));

    test("(409) duplicate user not allowed", () => {
      const newUser = Object.assign({}, userFactory.build(), {
        email: testUsers.users[1].email,
        about: "is quite random"
      });

      return apiClient
        .post(apiUrl)
        .set("x-access-token", tokens.admin)
        .send(newUser)
        .expect(HttpStatus.CONFLICT)
        .then(async res => {
          expect(res.body.message).toBe(DUPLICATE_USER.message);
        });
    });

    test("(201) create user returns expected fields", () => {
      const newUser = userFactory.build();

      return apiClient
        .post(apiUrl)
        .set("x-access-token", tokens.admin)
        .send(newUser)
        .expect(HttpStatus.CREATED)
        .then(async res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["id", "name", "email", "about"])
          );
          expect(res.body.password).toBeUndefined();
        });
    });

    test("(201) create user adds DB item", () => {
      const newUser = userFactory.build();

      return apiClient
        .post(apiUrl)
        .set("x-access-token", tokens.admin)
        .send(newUser)
        .expect(HttpStatus.CREATED)
        .then(async res => {
          const createdUser = await UserModel.query().findById(res.body.id);

          expect(createdUser).toEqual(
            expect.objectContaining({
              about: newUser.about,
              email: newUser.email,
              name: newUser.name,
              id: res.body.id,
              is_active: 1
            })
          );

          // TODO expect(bcrypt.compareSync(DEFAULT_PASSWORD, createdUser.password)).toEqual(true);
        });
    });
  });

  describe("#PUT api/users/:id", () => {
    test("(403) user not allowed to update user", () =>
      apiClient
        .put(`${apiUrl}/2`)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .send({})
        .expect(HttpStatus.FORBIDDEN)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));

    test("(409) duplicate user not allowed", () => {
      const updatedUser = Object.assign({}, testUsers.users[0], {
        email: testUsers.users[1].email,
        about: "is quite random"
      });
      return apiClient
        .put(`${apiUrl}/2`)
        .set("x-access-token", tokens.admin)
        .send(updatedUser)
        .expect(HttpStatus.CONFLICT)
        .then(async res => {
          expect(res.body.message).toBe(DUPLICATE_USER.message);
        });
    });

    test("(201) updating user returns expected fields", () => {
      const userToUpdate = {
        name: "Randy Bagner",
        about: "is quite random"
      };

      const id = testUsers.users[0].id;

      return apiClient
        .put(`${apiUrl}/${id}`)
        .set("x-access-token", tokens.admin)
        .send(userToUpdate)
        .expect(HttpStatus.OK)
        .then(async res => {
          expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(["id", "name", "email", "about"])
          );
          expect(res.body.password).toBeUndefined();
        });
    });

    test("(200) updates user in DB", () => {
      const userToUpdate = {
        name: "Randy Bagner",
        about: "is quite random"
      };

      const { id } = testUsers.users[0];

      return apiClient
        .put(`${apiUrl}/${id}`)
        .set("x-access-token", tokens.admin)
        .send(userToUpdate)
        .expect(HttpStatus.OK)
        .then(async res => {
          expect(res.body.id).toBe(id);

          const updatedUser = await UserModel.query().findById(res.body.id);

          expect(updatedUser.name).toBe(userToUpdate.name);
          expect(updatedUser.about).toBe(userToUpdate.about);
        });
    });
  });

  describe("#DELETE api/users/:id", () => {
    test("(403) regular user not allowed to delete user", () =>
      apiClient
        .delete(`${apiUrl}/2`)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .expect(HttpStatus.FORBIDDEN)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));

    test("(403) cannot delete admin user", () =>
      apiClient
        .delete(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .expect(HttpStatus.METHOD_NOT_ALLOWED)
        .then(res => {
          expect(res.body.message).toBe(DELETE_DEFAULT_ADMIN.message);
        }));

    test("(200) deletes user", () =>
      apiClient
        .delete(`${apiUrl}/2`)
        .set("x-access-token", tokens.admin)
        .expect(200)
        .then(async () => {
          const deletedUser = (await UserModel.knex()
            .table("user")
            .where("id", 2))[0];

          expect(deletedUser.is_active).toBeFalsy();
        }));
  });
});
