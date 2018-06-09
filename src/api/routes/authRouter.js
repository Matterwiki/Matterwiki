const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const SlackStrategy = require("passport-slack").Strategy;

const env = process.env.NODE_ENV;
const config = require("dotenv").config({
  path: `config.${env}.env`
});
const jwt = require("jsonwebtoken");
const { omit } = require("lodash");
const HttpStatus = require("http-status-codes");

const router = express.Router();

const { JSONParser } = require("../middleware/bodyParser");
const checkAuth = require("../middleware/checkAuth");

const { authSecret } = require("../config");

const { TOKEN_EXPIRATION, ERRORS } = require("../utils/constants");

const UserModel = require("../models/userModel");
const AuthModel = require("../models/authModel");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) return next(ERRORS.CREDS_WRONG);

    const user = (await UserModel.query().where({ email }))[0];

    // user not found, kick user out
    if (!user) {
      return next(ERRORS.CREDS_WRONG);
    }

    const passwordAuth = (await AuthModel.query().where({ user_id: user.id, type: "password" }))[0];

    let userValid = false;
    if (passwordAuth) {
      userValid = await bcrypt.compare(password, passwordAuth.key);
    }

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
// Building OAuth

// setup the strategy using defaults
passport.use(
  new SlackStrategy(
    {
      clientID: process.env.SLACK_CLIENT_ID,
      clientSecret: process.env.SLACK_CLIENT_SECRET
    },
    async (accessToken, refreshToken, profile, done) => {
      // optionally persist profile data
      try {
        console.log("Access Token", accessToken);
        console.log("Refresh Token", refreshToken);
        console.log("Profile", profile);
        const user = (await UserModel.query().where({ email: profile.user.email }))[0];
        console.log("User", user);
        if (!user) {
          const createdUser = await UserModel.query().insert({
            name: profile.user.name,
            email: profile.user.email,
            about: ""
          });
          await AuthModel.query().insert({
            user_id: createdUser.id,
            type: "slack",
            key: accessToken
          });
        } else {
          const slackAuth = (await AuthModel.query().where({ user_id: user.id, type: "slack" }))[0];
          if (!slackAuth) {
            await AuthModel.query().insert({
              user_id: user.id,
              type: "slack",
              key: accessToken
            });
          } else {
            await AuthModel.query()
              .update({ key: accessToken })
              .where({ user_id: user.id });
          }
        }
        done(null, profile);
      } catch (e) {
        done(true, null);
      }
    }
  )
);

// path to start the OAuth flow
router.get("/slack", passport.authorize("slack"));

// OAuth callback url
router.get(
  "/slack/callback",
  passport.authorize("slack", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
