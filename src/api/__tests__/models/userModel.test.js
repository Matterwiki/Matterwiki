const Promise = require("bluebird");
const { knexInstance: knex } = require("../../utils/db");
const {
  initTestDb,
  destroyTestDb,
  truncateDb
} = require("../testUtils/dbHelpers");

const { user: userFactory } = require("../factories/factories");

const UserModel = require("../../models/userModel");

describe("User model tests", () => {
  let dbUsers = null;

  beforeAll(initTestDb);
  afterAll(destroyTestDb);

  beforeEach(() => truncateDb(false));
  beforeEach(() => {
    const newUsers = [userFactory.build(1, "ADMIN"), ...userFactory.build(2)];

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
    const expectedUsers = dbUsers.filter(user => user.role === "USER");
    const filteredDbUsers = await UserModel.getAll({ role: "USER" });

    filteredDbUsers.forEach((dbUser, i) => {
      expect(dbUser).toEqual(expectedUsers[i]);
    });
  });

  test("Inserts user and returns inserted user", async () => {
    const userToInsert = userFactory.build(1, "ADMIN");
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

    const deletedDbUser = await UserModel.get(id);

    expect(deletedDbUser.is_active).toBeFalsy();
  });

  test("Gets only active users", async () => {
    const expectedUsers = dbUsers.filter(user => user.role === "USER");

    const { id } = expectedUsers[0];

    await UserModel.delete(id);

    const filteredDbUsers = await UserModel.getAll({ role: "USER" });

    expect(filteredDbUsers.map(user => user.id)).not.toContain(id);
  });

  test("Gets inactive user if `is_active` param is passed in", async () => {
    const expectedUsers = dbUsers.filter(user => user.role === "USER");

    const { id } = expectedUsers[0];

    await UserModel.delete(id);

    const filteredDbUsers = await UserModel.getAll({
      role: "USER",
      is_active: false
    });

    expect(filteredDbUsers.map(user => user.id)).toContain(id);
  });

  describe("Model Search tests", () => {
    beforeEach(() => {
      // update users to something we know
      const updateName = () =>
        UserModel.update(dbUsers[0].id, { name: "jolly ladwig fell" });
      const updateAbout = () =>
        UserModel.update(dbUsers[1].id, { about: "funky nosed fella" });

      return Promise.all([updateAbout(), updateName()]);
    });

    test("Finds User by search string provided for `name`", async () => {
      const filteredDbItems = await UserModel.search("jolly");

      expect(filteredDbItems).toHaveLength(1);
      expect(filteredDbItems[0].name).toContain("jolly");
      expect(filteredDbItems[0].name).toContain("jolly ladwig fell");
    });

    test("Finds User by search string provided for `about`", async () => {
      const filteredDbItems = await UserModel.search("funky");

      expect(filteredDbItems).toHaveLength(1);
      expect(filteredDbItems[0].about).toContain("funky");
      expect(filteredDbItems[0].about).toContain("funky nosed fella");
    });

    test("Finds Users by search string provided for `name`/`about`", async () => {
      const filteredDbItems = await UserModel.search("fell");

      expect(filteredDbItems).toHaveLength(2);
      expect(filteredDbItems[0].name).toContain("fell");
      expect(filteredDbItems[1].about).toContain("fell");
    });

    test("Returns no users when search string does not match any User", async () => {
      const filteredDbItems = await UserModel.search("fewfgiuweghell");

      expect(filteredDbItems).toHaveLength(0);
    });
  });
});
