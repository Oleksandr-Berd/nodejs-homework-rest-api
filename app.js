const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
// const avatarRouter = require("./routes/api/avatars");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

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

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/useravatar", upload.single("image"), (req, res) => {
  console.log(req.file);
});
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
