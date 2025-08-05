const { Router } = require("express");
const {
  getLoggedInUser,
  fetchUsers,
  uploadProfilePic,
} = require("../controllers/user.controller.js");

const router = Router();

router.get("/", fetchUsers);
router.get("/active-user", getLoggedInUser);
router.post("/upload-profile-pic", uploadProfilePic);

module.exports = router;
