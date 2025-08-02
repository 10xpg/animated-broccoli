const Chat = require("../models/chat.model.js");

const createNewChat = async (req, res) => {
  try {
    const { members } = req.body;
    const newChat = await Chat.create({ members });

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

module.exports = { createNewChat, fetchChats };
