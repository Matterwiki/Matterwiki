const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const { SALT_ROUNDS, ADMIN_ID } = require("../utils/constants");

// Pick out the errors
const { DUPLICATE_ADMIN_USER } = require("../utils/constants").ERRORS;

const userModel = require("../models/user");

const setupAdminUser = async (req, res, next) => {
  const { name, email, about } = req.body;

  // hash password
  const password = await bcrypt.hash(req.body.password, SALT_ROUNDS);

  // create the admin user
  const adminUser = {
    id: ADMIN_ID,
    name,
    email,
    password,
    about
  };

  try {
    const newUser = await userModel.post(adminUser);
    res.status(200).json(newUser);
  } catch (err) {
    if (err.code === DUPLICATE_ADMIN_USER.code) {
      err.message = DUPLICATE_ADMIN_USER.message;
      // http://stackoverflow.com/a/3826024/1217785
      err.status = 409;
    }

    next(err);
  }
};

router.post("/", JSONParser, setupAdminUser);

module.exports = router;
