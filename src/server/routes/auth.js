const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const checkAuth = require("../middleware/checkAuth");

const { authSecret } = require("../utils/config");

// Pick out the errors
const { USER_NOT_FOUND, CREDS_WRONG } = require("../utils/constants").ERRORS;

const userModel = require("../models/user");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.get({ email });

    // user not found, kick user out
    if (!user) {
      const err = {
        status: 401,
        code: USER_NOT_FOUND.code,
        message: USER_NOT_FOUND.message
      };
      return next(err);
    }

    user = user.toJSON();
    const userValid = await bcrypt.compare(password, user.password);

    // credentials wrong, kick user out
    if (!userValid) {
      const err = {
        status: 401,
        code: CREDS_WRONG.code,
        message: CREDS_WRONG.message
      };

      return next(err);
    }

    // Everything is fine and dandy (Phew..)

    // make token
    user.token = jwt.sign(user, authSecret, {
      expiresIn: 86400
    });

    // send away!
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const finishCheck = (req, res, next) => res.status(200).json({});

router.post("/login", JSONParser, loginUser);
router.get("/check", checkAuth, finishCheck);

module.exports = router;
