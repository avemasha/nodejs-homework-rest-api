const addContact = require("./addContact");
const getContact = require("./getContact");
const getInfo = require("./getInfo");
const currentUser = require("./currentUser");
const logout = require("./logout");
const updateStatusContact = require("./updateSubs");
const uploadAvatar = require("./uploadAvatar");
const verifyEmail = require("./verifyEmail");
const secondaryVerify = require("./secondaryVerify");

const { regControllerWrapper } = require("../auth/regControllerWrapper");

module.exports = {
  addContact: regControllerWrapper(addContact),
  getContact: regControllerWrapper(getContact),
  getInfo: regControllerWrapper(getInfo),
  currentUser: regControllerWrapper(currentUser),
  logout: regControllerWrapper(logout),
  updateStatusContact: regControllerWrapper(updateStatusContact),
  uploadAvatar: regControllerWrapper(uploadAvatar),
  verifyEmail: regControllerWrapper(verifyEmail),
  secondaryVerify: regControllerWrapper(secondaryVerify),
};
