import express from "express";
import * as userController from "../controllers/user.controller.js";
import authenticateToken from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/get-me", authenticateToken, userController.getMe);
router.get("/refresh-token", userController.refreshToken);

router.get("/check", (req, res) => {
	res.send("User route is running");
});

export default router;
