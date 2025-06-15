const { authModel } = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const authController = {

  async signup(req, res) {
    const { name, email, password } = req.body;
    try {
      const getUser = await authModel.findOne({ email }).select("+password");
      if (getUser) {
        return res.status(404).json({ message: "User allready exits" });
      } else {
        const newUser = await authModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 5),
        });
        return res.status(201).json({ message: "New user created!", newUser });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const getUser = await authModel.findOne({ email }).select("+password");
      if (getUser) {
        const isValid = await bcrypt.compare(password, getUser.password);

        if (isValid) {
          const token = await jwt.sign(
            {_id: getUser.id },
            process.env.SECRET_KEY,
            { expiresIn: "2d" }
          );
          return res.status(201).json({ message: "Signin Success", token });
        } else {
          return res.status(401).json({ message: "Invalid credentials" });
        }
      } else {
        return res
          .status(400)
          .json({ message: "User not exits, please signup!" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  },
};

module.exports = { authController };
