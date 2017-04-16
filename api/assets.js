/*
This file contains all the endpoints related to uploading wiki assets. 
For now, the only assets that can be uploaded are images. 
There could be files, videos, etc. later on too! (we'll never know)
For the method we use to categorize endpoints in file please read the top
comment in the articles.js (same directory).
*/

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./wiki_assets/",
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

module.exports = app => {
    app.post("/assets", upload.single("file"), (req, res) => {
        const { path, filename } = req.file;

        res.json({
            path,
            filename
        });
    });
};
