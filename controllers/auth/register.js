const { Conflict } = require("http-errors");
const { User } = require("../../models/index");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { password, email } = req.body;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  console.log(passwordHash);
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`This email: ${email} in use`);
  }
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    password: passwordHash,
    email,
    avatarURL,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
        subscription: "starter",
      },
    },
  });
  console.log(result);
};

module.exports = register;
