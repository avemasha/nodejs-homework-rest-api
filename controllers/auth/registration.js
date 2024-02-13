const User = require("../../models/users");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const registration = async (req, res, next) => {
  const { error } = User.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "identicon" });

  console.log("Avatar URL:", avatarURL);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    subscription: "starter",
    avatarURL: avatarURL,
  });

  console.log("newUser:", newUser);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });

  return await newUser;
};

module.exports = registration;
