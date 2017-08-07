const UserModel = require("../../models/userModel");
const { NO_ACCESS } = require("../../utils/constants").ERRORS;

const {
  setupAll,
  setupEach,
  teardownAll
} = require("../testUtils/globalSetup");

const { userHolder, tokenHolder } = require("../testUtils/modelHolder");
const { factories, apiClient } = require("../testUtils/testUtils");

describe("User API tests", () => {
  beforeAll(setupAll);
  afterAll(teardownAll);
  beforeEach(setupEach);

  const apiUrl = "/api/users/";
  let testUsers = {};
  let tokens = {};

  beforeAll(() => {
    testUsers = userHolder.get();
    tokens = tokenHolder.get();
  });

  describe("GET api/users", () => {
    test("403 user - INVALID - only admin allowed to fetch users", () =>
      apiClient
        .get(apiUrl)
        .set("x-access-token", tokens.user)
        .expect(403)
        .then(res => expect(res.body.message).toBe(NO_ACCESS.message)));

    test("200 admin - VALID - returns expected users", () =>
      apiClient
        .get(apiUrl)
        .set("x-access-token", tokens.admin)
        .expect(200)
        .then(async res => {
          const dbUsers = (await UserModel.getAll()).toJSON();
          expect(res.body).toHaveLength(dbUsers.length);

          res.body.forEach((user, i) => {
            expect(user).toEqual(
              expect.objectContaining({
                about: dbUsers[i].about,
                email: dbUsers[i].email,
                name: dbUsers[i].name,
                password: dbUsers[i].password,
                id: dbUsers[i].id
              })
            );
          });
        }));
  });
  describe("GET api/users/:id", () => {
    test("403 user - INVALID - only admin allowed to fetch specific user", () =>
      apiClient
        .get(`${apiUrl}/1`)
        .set("x-access-token", tokens.user)
        .expect(403)
        .then(res => expect(res.body.message).toBe(NO_ACCESS.message)));

    test("200 admin - VALID - returns expected user", () =>
      apiClient
        .get(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .expect(200)
        .then(async res => {
          const user = (await UserModel.get({ id: 1 })).toJSON();

          expect(res.body).toEqual(
            expect.objectContaining({
              about: user.about,
              email: user.email,
              name: user.name,
              password: user.password,
              id: user.id
            })
          );
        }));
  });

  describe("POST api/users/", () => {
    test("403 user - INVALID - only admin allowed to create user", () =>
      apiClient
        .post(apiUrl)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .send({})
        .expect(403)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));

    xtest("201 admin - VALID - should hash password when creating user");

    // TODO this test is incredibly slow
    test("201 admin - VALID - creates user", () => {
      const newUser = factories.user.build();

      return apiClient
        .post(apiUrl)
        .set("x-access-token", tokens.admin)
        .send(newUser)
        .expect(201)
        .then(async res => {
          const user = (await UserModel.get({ id: res.body.id })).toJSON();

          expect(user.id).toEqual(res.body.id);
          expect(res.body).toEqual(
            expect.objectContaining({
              about: newUser.about,
              email: newUser.email,
              name: newUser.name
            })
          );
        });
    });
  });
  describe("PUT api/users/:id", () => {
    test("403 user - INVALID - only admin allowed to update user", () =>
      apiClient
        .put(`${apiUrl}/2`)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .send({})
        .expect(403)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));

    xtest("201 admin - VALID - should hash password when updating user");

    test("200 admin - VALID - updates user", () => {
      const updatedUser = Object.assign({}, testUsers[0], {
        name: "Randy Bagner",
        about: "is quite random"
      });
      return apiClient
        .put(`${apiUrl}/2`)
        .set("x-access-token", tokens.admin)
        .send(updatedUser)
        .expect(200)
        .then(async res => {
          expect(res.body.id).toBe("2");
          expect(res.body.name).toBe(updatedUser.name);
          expect(res.body.about).toBe(updatedUser.about);
        });
    });
  });
  describe("DELETE api/users/:id", () => {
    test("403 user - INVALID - only admin allowed to delete user", () =>
      apiClient
        .delete(`${apiUrl}/2`)
        // Using a non-admin for making this token
        .set("x-access-token", tokens.user)
        .expect(403)
        .then(res => {
          expect(res.body.message).toBe(NO_ACCESS.message);
        }));
    test("403 admin - INVALID - cannot delete admin user", () =>
      apiClient
        .delete(`${apiUrl}/1`)
        .set("x-access-token", tokens.admin)
        .expect(200)
        .then(async () => {
          const user = await UserModel.get({ id: 1 });
          expect(user).not.toBeNull();
        }));

    test("200 admin - VALID - deletes user", () =>
      apiClient
        .delete(`${apiUrl}/2`)
        .set("x-access-token", tokens.admin)
        .expect(200)
        .then(async () => {
          const topic = await UserModel.get({ id: 2 });
          expect(topic).toBeNull();
        }));
  });
});
