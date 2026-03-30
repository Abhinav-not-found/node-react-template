import jwt from "jsonwebtoken";
import ENV from "../lib/env.js";
import TokenBlackList from "../models/blackList.model.js";

async function authenticateToken(req, res, next) {
	const token = req.cookies.token;

	if (!token) return res.status(401).json({ message: "No token provided" });

	const blacklisted = await TokenBlackList.findOne({ token });
	if (blacklisted) return res.status(401).json({ message: "Token expired" });

	try {
		const decoded = jwt.verify(token, ENV.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		console.log(error);
		return res.status(403).json({ message: "Invalid or expired token" });
	}
}

export default authenticateToken;
