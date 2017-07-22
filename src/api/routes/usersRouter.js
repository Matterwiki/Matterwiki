const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const checkAuth = require("../middleware/checkAuth");
const { checkIfAdmin } = require("../middleware/checkRole");

const { SALT_ROUNDS } = require("../utils/constants");

const userModel = require("../models/user");

const fetchUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

const fetchUsersById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel.get({ id });
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

    newUser = await userModel.post(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, about, password } = req.body;

  try {
    let updatedUser = {
      name,
      email,
      about
    };

    if (password) {
      // hash password
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      updatedUser.password = hashedPassword;
    }

    updatedUser = await userModel.put({ id }, updatedUser);

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (parseInt(id, 10) !== 1) {
      await userModel.delete({ id });
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
