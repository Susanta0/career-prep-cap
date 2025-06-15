const { Router } = require("express");
const { authController } = require("../controller/auth.controller");

const authRouter = Router();

authRouter.post("/auth/signup", authController.signup);
authRouter.post("/auth/signin", authController.login);

module.exports = { authRouter };
