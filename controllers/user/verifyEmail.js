const User = require("../../models/users");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);

  const user = await User.findOne({ verificationToken });
  console.log(user);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.verify = true;
  user.verificationToken = null;
  await user.save();

  return res.status(200).json({ message: "Verification successful" });
};

module.exports = verifyEmail;
