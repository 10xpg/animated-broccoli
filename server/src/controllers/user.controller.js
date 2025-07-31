const User = require("../models/user");
const { routeProtection } = require("../middlewares/auth.middleware");

const getLoggedInUser = [
  routeProtection,
  async (req, res) => {
    try {
      const { sub } = req.user;
      const user = await User.findOne({ _id: sub });

      res.json({
        message: "Fetched user successfuly",
        success: true,
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message, success: false });
    }
  },
];

module.exports = { getLoggedInUser };
