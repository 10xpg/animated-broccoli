const { Router } = require("express");
const { getLoggedInUser } = require("../controllers/user.controller.js");

const router = Router();

router.get("/active-user", getLoggedInUser);

module.exports = router;
