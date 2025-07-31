const { Router } = require("express");
const {
  getLoggedInUser,
  fetchUsers,
} = require("../controllers/user.controller.js");

const router = Router();

router.get("/", fetchUsers);
router.get("/active-user", getLoggedInUser);

module.exports = router;
