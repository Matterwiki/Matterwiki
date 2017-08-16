const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const checkAuth = require("../middleware/checkAuth");
const { checkIfAdmin } = require("../middleware/checkRole");

const { SALT_ROUNDS, ERRORS } = require("../utils/constants");

const UserModel = require("../models/userModel");

const fetchUsers = async (req, res, next) => {
  try {
    const users = await UserModel.getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const fetchUsersById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await UserModel.get(id);
    res.status(200).json(user);
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
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // create the admin user
    let newUser = {
      name,
      email,
      password: hashedPassword,
      about
    };

    newUser = await UserModel.insert(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === ERRORS.DUPLICATE_USER.code) {
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

    const updatedUser = await UserModel.update(id, req.body);

    res.status(200).json(updatedUser);
  } catch (err) {
    if (err.code === ERRORS.DUPLICATE_USER.code) {
      return next(ERRORS.DUPLICATE_USER);
    }
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (parseInt(id, 10) !== 1) {
      await UserModel.delete(id);
    }
    res.status(200).json({});
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
