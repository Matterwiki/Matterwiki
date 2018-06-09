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
const AuthModel = require("../models/authModel");

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
      about,
      role: ROLES.ADMIN
    };

    await UserModel.query().insert(adminUser);
    await AuthModel.query().insert({
      user_id: ADMIN_ID,
      type: "password",
      key: hashedPassword
    });

    res.status(HttpStatus.CREATED).end();
  } catch (err) {
    next(err);
  }
};

router.post("/", JSONParser, setupAdminUser);

module.exports = router;
