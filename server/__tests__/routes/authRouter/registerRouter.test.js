const Promise = require("bluebird");
const Chance = require("chance");
const { merge, pick } = require("lodash");
const HttpStatus = require("http-status-codes");
const bcrypt = require("bcryptjs");

const { apiClient } = require("../../testUtils/testUtils");
const {
  setupAll,
  tearDownEach,
  tearDownAll
} = require("../../testUtils/globalSetupTeardown");
const { makeUsersWithSingleUseToken } = require("../../dataStubs/userStubs");

const { INVALID_ONE_TIME_TOKEN } = require("../../../apiErrors");
const { INVALID_REGISTRATION_DATA } = require("../../../validationErrors");

const UserModel = require("../../../data/UserModel");
const userFactory = require("../../dataStubs/testFactories/userFactory");

const verifyNotFoundBehaviour = require("../../sharedBehaviours/verifyRouteNotFound.behaviour");

const chance = new Chance();

describe("Auth/Registration tests", () => {
  const apiUrl = "/api/auth/register";

  beforeAll(setupAll);
  afterAll(tearDownAll);

  beforeEach(() =>
    makeUsersWithSingleUseToken(1).then(async user => {
      this.testUser = user;
    })
  );
  afterEach(tearDownEach);

  verifyNotFoundBehaviour(apiUrl, ["GET", "PUT", "DELETE"]);

  describe("#POST /api/auth/register", () => {
    it(`(400) email, password required`, () =>
      Promise.each([null, undefined, ""], falsyValue =>
        apiClient
          .post(apiUrl)
          // TODO check either or situation.. {email: null, password: duifgerbv329} and {email: goodemail@ex.com, password: null}
          .send({ email: falsyValue, password: falsyValue })
          .expect(HttpStatus.BAD_REQUEST)
          .then(res => {
            expect(res.body.error).toEqual(INVALID_REGISTRATION_DATA);
          })
      ));

    it(`(400) email should be a valid email`);
    it(`(400) password should be atleast 8 characters long`);

    it(`(403) singleUseToken is required and cannot be falsy`, () =>
      Promise.each([null, undefined, ""], falsyValue =>
        apiClient
          .post(apiUrl)
          .send({
            singleUseToken: falsyValue,
            email: chance.email(),
            password: chance.guid()
          })
          .expect(HttpStatus.FORBIDDEN)
          .then(res => {
            expect(res.body.error).toEqual(INVALID_ONE_TIME_TOKEN);
          })
      ));

    it(`(403) using an invalid single use token is forbidden`, () => {
      apiClient
        .post(apiUrl)
        .send({
          singleUseToken: "random-single-use-token",
          email: this.testUser.email,
          password: chance.guid()
        })
        .expect(HttpStatus.FORBIDDEN)
        .then(res => {
          expect(res.body.error).toEqual(INVALID_ONE_TIME_TOKEN);
        });
    });

    it(`(403) using wrong email is forbidden`, () => {
      apiClient
        .post(apiUrl)
        .send({
          singleUseToken: this.testUser.singleUseToken,
          email: chance.email(),
          password: chance.guid()
        })
        .expect(HttpStatus.FORBIDDEN)
        .then(res => {
          // NOTE the message is intentianally wrong.. we dont want to give folks too many details about this
          expect(res.body.error).toEqual(INVALID_ONE_TIME_TOKEN);
        });
    });

    it(`(201) user has expected data`, () => {
      let postData = userFactory.build(1);

      // pick needed fields
      postData = merge(pick(postData, ["about", "name", "password"]), {
        singleUseToken: this.testUser.singleUseToken,
        email: this.testUser.email
      });

      return apiClient
        .post(apiUrl)
        .send(postData)
        .expect(HttpStatus.CREATED)
        .then(async res => {
          const user = await UserModel.get(this.testUser.id);

          expect(user.email).toBe(postData.email);
          expect(user.name).toBe(postData.name);
          expect(user.about).toBe(postData.about);
          expect(bcrypt.compareSync(postData.password, user.password)).toEqual(
            true
          );
          expect(user.singleUseToken).toBeNull();
        });
    });

    it(`(201) user is not returned in the response`, () => {
      let postData = userFactory.build(1);

      // pick needed fields
      postData = merge(pick(postData, ["about", "name", "password"]), {
        singleUseToken: this.testUser.singleUseToken,
        email: this.testUser.email
      });

      return apiClient
        .post(apiUrl)
        .send(postData)
        .expect(HttpStatus.CREATED)
        .then(async res => {
          expect(res.body).toEqual({});
        });
    });
  });
});
