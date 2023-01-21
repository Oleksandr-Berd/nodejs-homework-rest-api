const multer = require("multer");
const path = require("path");

const dirName = path.join(__dirname, "temp");
console.log(dirName);
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dirName);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
