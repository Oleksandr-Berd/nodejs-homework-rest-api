const { User } = require("../../models/usersModels");
const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const patchAvatars = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  try {
    const resultUpload = path.join(avatarsDir, originalname);
    fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join(avatarsDir, originalname);
    console.log(avatarURL);
    await User.findByIdAndUpdate(
      req.user._id,
      { avatarURl: avatarURL },
      { new: true }
    );
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = patchAvatars;
