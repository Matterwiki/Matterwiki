const express = require("express");
const bcrypt = require("bcryptjs");
const HttpStatus = require("http-status-codes");
const { isNil } = require("lodash");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const { SALT_ROUNDS, ADMIN_ID, ROLES } = require("../utils/constants");

// Pick out the errors
const { DUPLICATE_ADMIN_USER } = require("../utils/constants").ERRORS;

const UserModel = require("../models/userModel");

const setupAdminUser = async (req, res, next) => {
  const { name, email, about, password } = req.body;

  try {
    const adminUserFromDb = await UserModel.query().findOne({ id: 1 });

    if (!isNil(adminUserFromDb)) return next(DUPLICATE_ADMIN_USER);

    // hash password
    const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    // create the admin user
    const adminUser = {
      id: ADMIN_ID,
      name,
      email,
      password: hashedPassword,
      about,
      role: ROLES.ADMIN
    };

    await UserModel.query().insert(adminUser);
    res.status(HttpStatus.CREATED).end();
  } catch (err) {
    next(err);
  }
};

router.post("/", JSONParser, setupAdminUser);

module.exports = router;
