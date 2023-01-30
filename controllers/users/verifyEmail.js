const { NotFound } = require("http-errors");
const { User } = require("../../models/usersModels");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw NotFound();
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "verification is completed successfully",
  });
};

module.exports = verifyEmail;
