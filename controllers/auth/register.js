const { Conflict } = require("http-errors");
const { User } = require("../../models/index");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../sendGrid/index");

const register = async (req, res) => {
  const { password, email } = req.body;
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  console.log(passwordHash);
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`This email: ${email} in use`);
  }
  const verificationToken = uuidv4();
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    password: passwordHash,
    email,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "email verification",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">to verify email</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
        subscription: "starter",
        verificationToken,
      },
    },
  });
  console.log(result);
};

module.exports = register;
