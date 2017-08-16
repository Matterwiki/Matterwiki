const express = require("express");

const router = express.Router();

const setupRouter = require("./routes/setupRouter");
const authRouter = require("./routes/authRouter");
const articleRouter = require("./routes/articleRouter/articleRouter");
const topicsRouter = require("./routes/topicRouter");
const userRouter = require("./routes/userRouter");

// Sample API endpoint
router.get("/api", (req, res) => {
  res.send("Hey! You're looking at the Matterwiki API");
});

// TODO find a way to add bodyParser stuff here - should happen only for POSTs

// all the app routes
router.use("/api/setup", setupRouter);
router.use("/api/auth", authRouter);
router.use("/api/articles", articleRouter);
router.use("/api/users", userRouter);
router.use("/api/topics", topicsRouter);

module.exports = router;
