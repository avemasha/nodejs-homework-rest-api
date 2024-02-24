const User = require("../../models/users");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

const { EMAIL_API_USER, EMAIL_API_PASSWORD } = process.env;

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

  const verificationToken = uuidv4();
  console.log(verificationToken);

  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email, { s: "200", r: "pg", d: "identicon" });

  const newUser = await User.create({
    email,
    password: hashedPassword,
    subscription: "starter",
    verificationToken: verificationToken,
    verify: false,
  });

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_API_USER,
      pass: EMAIL_API_PASSWORD,
    },
  });

  const mailOptions = {
    from: "noreply-contactsweb@gmail.com",
    to: email,
    subject: "Verify your email",
    text: `Click the following link to verify your email: http://localhost:3000/users/verify/${verificationToken}`,
  };

  await transport.sendMail(mailOptions);

  console.log("newUser:", newUser);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: avatarURL,
      verificationToken: newUser.verificationToken,
    },

    message: "User registered successfully. Verification email sent.",
  });

  return await newUser;
};

module.exports = registration;
