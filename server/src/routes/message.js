const { Router } = require("express");
const {
  sendMessage,
  fetchMessages,
} = require("../controllers/message.controller");

const router = Router();

router.post("/send", sendMessage);
router.get("/:chatId", fetchMessages);

module.exports = router;
