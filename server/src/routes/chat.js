const { Router } = require("express");
const {
  createNewChat,
  fetchChats,
  clearUnreadMessages,
} = require("../controllers/chat.controller");

const router = Router();

router.post("/create", createNewChat);
router.post("/clear", clearUnreadMessages);
router.get("/", fetchChats);

module.exports = router;
