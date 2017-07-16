const express = require("express");

const router = express.Router();

const checkAuth = require("../middleware/checkAuth");

const filePath = "./src/client/assets";
const fileName = "logo.png";

const upload = require("../middleware/upload")(filePath, fileName);

// TODO Now that we use MySQL, we could store this logo in base64, instead of uploading this
router.post("/logo", checkAuth, upload.single("logo"));

module.exports = router;
