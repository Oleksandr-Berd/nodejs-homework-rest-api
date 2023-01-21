const express = require("express");
const { upload } = require("../../middlewares/index");

const routerAvatars = express.Router();

routerAvatars.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);
});

module.exports = routerAvatars;
