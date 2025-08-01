const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.JWT_SECRET;

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user)
      return res.status(409).json({
        message: `User with email '${email}' already exists`,
        success: false,
      });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({ ...req.body, password: hash });

    res.status(201).json({
      message: "User creation successful",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(404).json({
        message: `User with email '${email}' not found!`,
        success: false,
      });

    const pwdVerified = await bcrypt.compare(password, user.password);
    if (!pwdVerified)
      return res.status(401).json({
        message: "Invalid password",
        success: false,
      });

    jwt.sign(
      { sub: user._id },
      SECRET_KEY,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err)
          return res.status(401).json({ message: err.message, success: false });

        return res.json({
          message: "User authentication successful",
          success: true,
          accessToken: token,
        });
      },
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
module.exports = { signup, signin };
