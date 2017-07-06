const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const checkAuth = require("../middleware/checkAuth");

const { authSecret } = require("../utils/config");

// Pick out the errors
const { CREDS_WRONG } = require("../utils/constants").ERRORS;

const userModel = require("../models/user");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.get({ email });

    // user not found, kick user out
    if (!user) {
      return next(CREDS_WRONG);
    }

    user = user.toJSON();
    const userValid = await bcrypt.compare(password, user.password);

    // credentials wrong, kick user out
    if (!userValid) {
      return next(err);
    }

    // Everything is fine and dandy (Phew..)

    const payloadUser = user;

    // dont hash the password
    delete payloadUser.password;

    // make token and attach it to user
    payloadUser.token = jwt.sign(payloadUser, authSecret, {
      // TODO setup better timeout value
      expiresIn: 86400
    });

    // send away!
    res.status(200).json(payloadUser);
  } catch (err) {
    next(err);
  }
};

const finishCheck = (req, res, next) => res.status(200).json({});

router.post("/login", JSONParser, loginUser);
router.get("/check", checkAuth, finishCheck);

module.exports = router;
