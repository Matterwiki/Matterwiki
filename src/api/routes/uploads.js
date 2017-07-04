const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload")("./src/client/assets", "logo.png");

// TODO Now that we use MySQL, we could store this logo in base64, instead of uploading this
router.post("/logo", upload.single("logo"));

module.exports = router;
