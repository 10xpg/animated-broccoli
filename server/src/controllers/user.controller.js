const User = require("../models/user.model");
const cloudinary = require("../config/cloudinary.config");

const getLoggedInUser = async (req, res) => {
  try {
    const { sub } = req.user;
    const user = await User.findOne({ _id: sub });

    res.json({
      message: "Fetched user successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const fetchUsers = async (req, res) => {
  try {
    const { sub } = req.user;
    const users = await User.find({ _id: { $ne: sub } });
    res.json({
      message: "Users retrieval succesful",
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const uploadProfilePic = async (req, res) => {
  try {
    const { sub } = req.user;
    const { image } = req.body;

    // upload img to cloudinary
    const { secure_url: imageUrl } = await cloudinary.uploader.upload(image, {
      folder: "quickchat",
    });

    // set profilePic on user model
    const user = await User.findByIdAndUpdate(
      { _id: sub },
      { profileImg: imageUrl },
      { new: true },
    );

    res.json({
      message: "Profile picture update successful",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

module.exports = { getLoggedInUser, fetchUsers, uploadProfilePic };
