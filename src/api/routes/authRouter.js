const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { omit } = require("lodash");
const HttpStatus = require("http-status-codes");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const checkAuth = require("../middleware/checkAuth");

const { authSecret } = require("../config");

const { TOKEN_EXPIRATION, ERRORS } = require("../utils/constants");

const UserModel = require("../models/userModel");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return next(ERRORS.CREDS_WRONG);

    const user = (await UserModel.query().where({ email }))[0];

    // user not found, kick user out
    if (!user) {
      return next(ERRORS.CREDS_WRONG);
    }

    const userValid = await bcrypt.compare(password, user.password);

    // credentials wrong, kick user out
    if (!userValid) {
      return next(ERRORS.CREDS_WRONG);
    }

    // Everything is fine and dandy (Phew..)
    // dont hash the password
    const payloadUser = omit(user, "password");

    // make token and attach it to user
    payloadUser.token = jwt.sign(payloadUser, authSecret, {
      expiresIn: TOKEN_EXPIRATION
    });

    // send away!
    res.status(HttpStatus.CREATED).json(payloadUser);
  } catch (err) {
    next(ERRORS.CREDS_WRONG);
  }
};

const finishCheck = (req, res) => res.status(HttpStatus.OK).json(req.user);

router.post("/login", JSONParser, loginUser);
router.get("/check", checkAuth, finishCheck);

module.exports = router;
