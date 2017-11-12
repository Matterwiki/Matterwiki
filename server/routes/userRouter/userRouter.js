/**
 * This route handles CRUD of users in the system
 * - GET api/user/
 * - GET api/user/:id
 * - POST api/user
 * - PUT api/user/:id
 * - DELETE api/user/:id
 */

const userRouter = require("express").Router();
const bodyParser = require("body-parser");

const checkAuth = require("../../middleware/checkAuth");
const checkRoleAccess = require("../../middleware/checkRoleAccess");
const { ROLES } = require("../../constants");

const UserModel = require("../../data/UserModel");

function getUsers(req, res, next) {}
function getUsersById(req, res, next) {}
function createUser(req, res, next) {}
function updateUser(req, res, next) {}
function deleteUser(req, res, next) {}

// Needs to be authorized
userRouter.use(checkAuth);

// ADMIN only route
userRouter.use(checkRoleAccess([ROLES.ADMIN]));

userRouter.get("/", getUsers);
userRouter.get("/:id", getUsersById);
userRouter.post("/", bodyParser.json(), createUser);
userRouter.put("/:id", bodyParser.json(), updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
