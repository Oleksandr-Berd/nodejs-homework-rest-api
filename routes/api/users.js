const express = require("express");

const routerUsers = express.Router();
const { auth, upload } = require("../../middlewares/index");
const { users: ctrl } = require("../../controllers/index");
routerUsers.get("/current", auth, ctrl.getCurrent);
routerUsers.patch("/patch", auth, ctrl.patchSubscription);
routerUsers.patch(
  "/avatars/patch",
  auth,
  upload.single("avatar"),
  ctrl.patchAvatars
);
routerUsers.get("/verify/:verificationToken", ctrl.verifyEmail);

module.exports = routerUsers;
