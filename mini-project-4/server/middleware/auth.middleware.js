const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.split(" ")[1];
    
    if (token) {
      try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decode.userId;
        next();
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Internal server error", error });
      }
    } else {
      return res.status(401).json({ message: "Token is not provided" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { authMiddleware };
