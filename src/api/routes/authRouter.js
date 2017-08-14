const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { omit } = require("lodash");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const checkAuth = require("../middleware/checkAuth");

const { authSecret } = require("../config");

// Pick out the errors
const { CREDS_WRONG } = require("../utils/constants").ERRORS;
const { TOKEN_EXPIRATION } = require("../utils/constants").TOKEN_EXPIRATION;

const UserModel = require("../models/userModel");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = (await UserModel.getAll({ email }))[0];

    // user not found, kick user out
    if (!user) {
      return next(CREDS_WRONG);
    }

    const userValid = await bcrypt.compare(password, user.password);

    // credentials wrong, kick user out
    if (!userValid) {
      return next(CREDS_WRONG);
    }

    // Everything is fine and dandy (Phew..)
    // dont hash the password
    const payloadUser = omit(user, "password");

    // make token and attach it to user
    payloadUser.token = jwt.sign(payloadUser, authSecret, {
      expiresIn: TOKEN_EXPIRATION
    });

    // send away!
    res.status(201).json(payloadUser);
  } catch (err) {
    next(CREDS_WRONG);
  }
};

const finishCheck = (req, res) => res.status(200).json({});

router.post("/login", JSONParser, loginUser);
router.get("/check", checkAuth, finishCheck);

module.exports = router;
