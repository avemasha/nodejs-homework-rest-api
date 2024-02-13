const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/authMiddlewar");

const userController = require("../../controllers/user");
const upload = require("../../storage");

router.post("", authMiddleware, userController.addContact);
router.get("/contact", authMiddleware, userController.getContact);
router.get("/info", authMiddleware, userController.getInfo);
router.get("/current", authMiddleware, userController.currentUser);
router.post("/logout", authMiddleware, userController.logout);
router.patch("", authMiddleware, userController.updateStatusContact);
router.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  userController.addAvatar
);

module.exports = router;
