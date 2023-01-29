const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// const dirName = path.join(__dirname, "temp");
// const avatarsDir = path.join(__dirname, "public", "avatars");

// const multerConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, dirName);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: multerConfig,
// });

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

// const draftUsers = [];

// app.post("/api/draftusers", upload.single("image"), async (req, res) => {
//   const { path: tempUpload, originalname } = req.file;
//   const resultUpload = path.join(avatarsDir, originalname);
//   try {
//     await fs.rename(tempUpload, resultUpload);
//     const image = path.join("avatars", originalname);
//     const draftUser = {
//       name: req.body.name,
//       id: v4(),
//       image,
//     };
//     draftUsers.push(draftUser);

//     res.status(201).json(draftUser);
//   } catch (error) {
//     await fs.unlink(tempUpload);
//   }
// });

// app.get("/api/draftusers", (req, res) => {
//   res.json(draftUsers);
// });

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
