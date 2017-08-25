const Promise = require("bluebird");
const { knexInstance: knex } = require("../../utils/db");
const {
  initTestDb,
  destroyTestDb,
  truncateDb
} = require("../testUtils/dbHelpers");
const { ROLES } = require("../../utils/constants");
const { user: userFactory } = require("../factories/factories");

const UserModel = require("../../models/userModel");

describe("User model tests", () => {
  let dbUsers = null;

  beforeAll(initTestDb);
  afterAll(destroyTestDb);

  beforeEach(() => truncateDb(false));
  beforeEach(() => {
    const newUsers = [
      userFactory.build(1, ROLES.ADMIN),
      ...userFactory.build(2)
    ];

    return knex("user")
      .insert(newUsers)
      .then(() => knex("user").select())
      .then(users => {
        dbUsers = users;
      });
  });

  test("Gets user by ID", async () => {
    const expectedUser = dbUsers[0];
    const dbUser = await UserModel.get(expectedUser.id);

    expect(dbUser).toEqual(expectedUser);
  });

  test("Gets all users", async () => {
    const expectedUsers = dbUsers;
    const allDbUsers = await UserModel.getAll();

    allDbUsers.forEach((dbUser, i) => {
      expect(dbUser).toEqual(expectedUsers[i]);
    });
  });

  test("Gets all users filtered by query params", async () => {
    const expectedUsers = dbUsers.filter(user => user.role === ROLES.USER);
    const filteredDbUsers = await UserModel.getAll({ role: ROLES.USER });

    filteredDbUsers.forEach((dbUser, i) => {
      expect(dbUser).toEqual(expectedUsers[i]);
    });
  });

  test("Inserts user and returns inserted user", async () => {
    const userToInsert = userFactory.build(1, ROLES.ADMIN);
    const dbUser = await UserModel.insert(userToInsert);

    expect(dbUser).toBeInstanceOf(UserModel.Model);
    expect(dbUser.name).toEqual(userToInsert.name);
    expect(dbUser.email).toEqual(userToInsert.email);
    expect(dbUser.role).toEqual(userToInsert.role);
    expect(dbUser.is_active).toBeTruthy();
  });

  test("Inserts array of users", async () => {
    const usersToInsert = userFactory.build(2);
    const insertedDbUsers = await UserModel.insertMany(usersToInsert);

    insertedDbUsers.forEach((dbUser, i) => {
      expect(dbUser).toBeInstanceOf(UserModel.Model);
      expect(dbUser.name).toEqual(usersToInsert[i].name);
      expect(dbUser.email).toEqual(usersToInsert[i].email);
      expect(dbUser.role).toEqual(usersToInsert[i].role);
      expect(dbUser.is_active).toBeTruthy();
    });
  });

  test("Updates user by ID", async () => {
    const { id } = dbUsers[0];

    const updatedDbUser = await UserModel.update(id, { name: "New name" });

    expect(updatedDbUser.name).toEqual("New name");

    // rest of the props did not change
    expect(updatedDbUser.email).toEqual(dbUsers[0].email);
    expect(updatedDbUser.role).toEqual(dbUsers[0].role);
    expect(updatedDbUser.is_active).toBeTruthy();
  });

  test("Soft-deletes user by ID (sets to inactive)", async () => {
    const { id } = dbUsers[1];

    await UserModel.delete(id);

    const deletedDbUser = await knex("user").where("id", id);

    expect(deletedDbUser.is_active).toBeFalsy();
  });

  test("Gets only active users", async () => {
    const expectedUsers = dbUsers.filter(user => user.role === ROLES.USER);

    const { id } = expectedUsers[0];

    await UserModel.delete(id);

    const filteredDbUsers = await UserModel.getAll({ role: ROLES.USER });

    expect(filteredDbUsers.map(user => user.id)).not.toContain(id);
  });

  test("Gets inactive user if `is_active` param is passed in", async () => {
    const expectedUsers = dbUsers.filter(user => user.role === ROLES.USER);

    const { id } = expectedUsers[0];

    await UserModel.delete(id);

    const filteredDbUsers = await UserModel.getAll({
      role: "USER",
      is_active: false
    });

    expect(filteredDbUsers.map(user => user.id)).toContain(id);
  });
});
