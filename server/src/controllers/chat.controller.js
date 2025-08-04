const Chat = require("../models/chat.model.js");
const Message = require("../models/message.model.js");

const createNewChat = async (req, res) => {
  try {
    const { members } = req.body;
    const newChat = await Chat.create({ members });
    await newChat.populate("members");

    res
      .status(201)
      .json({ message: "Chat created", success: true, data: newChat });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const fetchChats = async (req, res) => {
  try {
    const { sub } = req.user;
    const chats = await Chat.find({ members: { $in: sub } })
      .populate("members")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    res.json({
      message: "Fetched all chats successfully",
      success: true,
      data: chats,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const clearUnreadMessages = async (req, res) => {
  try {
    const { chatId } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat)
      return res.status(404).json({
        message: `Chat with id '${chatId}' not found`,
        success: false,
      });

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        unreadMessageCount: 0,
      },
      { new: true },
    )
      .populate("members")
      .populate("lastMessage");

    await Message.updateMany({ chatId, read: false }, { read: true });
    res.json({
      message: "Unread messages cleared",
      success: true,
      data: updatedChat,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { createNewChat, fetchChats, clearUnreadMessages };
