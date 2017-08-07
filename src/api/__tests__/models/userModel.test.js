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
    const newUsers = userFactory.build(2);
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
  test("Gets all users filtered by query params");
  test("Inserts user and returns inserted user");
  test("Inserts array of users");
  test("Updates user by ID");
  test("Soft-deletes user by ID (sets to inactive)");
  test("Finds User by search string provided");
});
