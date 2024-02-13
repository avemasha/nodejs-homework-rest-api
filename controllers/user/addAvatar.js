const fs = require("fs");
const path = require("path");
const User = require("../../models/users");
const jimp = require("jimp");

const jwt = require("jsonwebtoken");

function getUserIdFromToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace 'your_secret_key' with your actual JWT secret key
    return decoded.userId;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

const addAvatar = async (req, res, next) => {
  console.log({ file: req.file });

  try {
    // Отримання ID користувача з токену (ваша логіка отримання ID користувача)
    const userId = getUserIdFromToken(req.headers.authorization.split(" ")[1]);

    // Перевірка наявності користувача
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Обробка завантаженого зображення
    const image = await jimp.read(req.file.path);
    await image.resize(250, 250).writeAsync(req.file.path);

    // Перенесення файлу з tmp у public/avatars з унікальним ім'ям
    const uniqueFileName = `${userId}-${Date.now()}${path.extname(
      req.file.originalname
    )}`;
    const destinationPath = path.join(
      __dirname,
      "../../public/avatars",
      uniqueFileName
    );
    await fs.promises.rename(req.file.path, destinationPath);

    // Оновлення поля avatarURL користувача
    user.avatarURL = `/avatars/${uniqueFileName}`;
    await user.save();

    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = addAvatar;
