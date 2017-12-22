const express = require("express");
const bcrypt = require("bcryptjs");
const HttpStatus = require("http-status-codes");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const checkAuth = require("../middleware/checkAuth");
const { checkIfAdmin } = require("../middleware/checkRole");

const { SALT_ROUNDS, ERRORS } = require("../utils/constants");

const UserModel = require("../models/userModel");

const fetchUsers = async (req, res, next) => {
  try {
    const users = await UserModel.query();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const fetchUsersById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await UserModel.query().findById(id);

    res.status(HttpStatus.OK).json(user);
  } catch (err) {
    next(err);
  }
};

// TODO Don't like the fact that the admin can create passwords for other users
// TODO There should probably be a better setup process
const createUser = async (req, res, next) => {
  const { name, email, about, password } = req.body;

  try {
    // hash password
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    // create the admin user
    let newUser = {
      name,
      email,
      password: hashedPassword,
      about
    };

    newUser = await UserModel.query().insert(newUser);
    res.status(HttpStatus.CREATED).json(newUser);
  } catch (err) {
    // TODO get more granular here
    // since this is the only kind of validation we have on emails, this is OK for now
    if (err.statusCode === HttpStatus.BAD_REQUEST && err.data.email) {
      return next(ERRORS.DUPLICATE_USER);
    }

    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    if (password) {
      // hash password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      req.body.password = hashedPassword;
    }

    const updatedUser = await UserModel.query().updateAndFetchById(id, req.body);

    res.status(HttpStatus.OK).json(updatedUser);
  } catch (err) {
    // TODO Apparently, validation does not work for updates! >.<
    // https://github.com/seegno/objection-unique/blob/master/test/index.test.js#L94
    if (err.code === ERRORS.DUPLICATE_USER.code) {
      return next(ERRORS.DUPLICATE_USER);
    }
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (id === "1") return next(ERRORS.DELETE_DEFAULT_ADMIN);

    await UserModel.query().deleteById(id);

    res.status(HttpStatus.OK).json({});
  } catch (err) {
    next(err);
  }
};

// Needs to be authorized
router.use(checkAuth);

// This is an all Admin route
router.use(checkIfAdmin);

router.get("/", fetchUsers);
router.get("/:id", fetchUsersById);

router.post("/", JSONParser, createUser);
router.put("/:id", JSONParser, updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
