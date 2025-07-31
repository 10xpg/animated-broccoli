const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

const routeProtection = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, SECRET_KEY, { algorithms: ["HS256"] }, (err, decoded) => {
      if (err)
        return res.status(401).json({
          message: err.message,
          success: false,
        });

      req.user = decoded;
      next();
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = { routeProtection };
