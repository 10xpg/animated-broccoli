const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

const sendMessage = async (req, res) => {
  try {
    const { text, chatId } = req.body;
    const { sub } = req.user;

    const message = await Message.create({ text, chatId, sender: sub });

    const currentChat = await Chat.findOneAndUpdate(
      { _id: chatId },
      { lastMessage: message._id, $inc: { unreadMessageCount: 1 } },
    );

    res.status(201).json({
      message: "Message sent successfully",
      success: true,
      data: message,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const fetchMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
    if (messages.length < 1)
      return res
        .status(404)
        .json({ message: "No messages found", success: false });

    res.json({
      message: "Retrieved all messages",
      success: true,
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { sendMessage, fetchMessages };
