const { Router } = require("express");
const { createNewChat, fetchChats } = require("../controllers/chat.controller");

const router = Router();

router.post("/create", createNewChat);
router.get("/", fetchChats);

module.exports = router;
