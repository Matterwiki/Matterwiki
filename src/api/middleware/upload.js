const multer = require("multer");

module.exports = (filePath, fileName) => {
  const storage = multer.diskStorage({
    destination: filePath,
    filename: (req, file, cb) => {
      cb(null, fileName);
    }
  });
  const upload = multer({ storage });

  return upload;
};
