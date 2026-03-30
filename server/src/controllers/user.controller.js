import jwt from "jsonwebtoken";
import ENV from "../lib/env.js";
import TokenBlackList from "../models/blackList.model.js";
import User from "../models/user.model.js";

export const register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({
				code: "MISSING_FIELDS",
				message: "All fields are required",
			});
		}

		const userExist = await User.findOne({ email });

		if (userExist) {
			return res.status(409).json({
				code: "EMAIL_EXISTS",
				message: "Email already registered",
			});
		}

		// Password is already hashed inside userModel

		const newUser = await User.create({
			name,
			email,
			password,
		});

		const token = jwt.sign(
			{
				id: newUser._id,
			},
			ENV.JWT_SECRET,
			{ expiresIn: "1d" },
		);

		res.cookie("token", token, {
			httpOnly: true,
			secure: ENV.NODE_ENV === "production",
			sameSite: "lax",
			maxAge:  24 * 60 * 60 * 1000, // 1day
		});

		res.status(201).json({
			message: "User Registered Successfully",
			newUser: {
				id: newUser._id,
				name: newUser.name,
				email: newUser.email,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				code: "MISSING_FIELDS",
				message: "All fields are required",
			});
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				code: "INVALID_CREDENTIALS",
				message: "Invalid email or password",
			});
		}

		const isMatch = await user.matchPassword(password);
		if (!isMatch) {
			return res.status(400).json({
				code: "INVALID_CREDENTIALS",
				message: "Invalid email or password",
			});
		}

		const token = jwt.sign(
			{
				id: user._id,
			},
			ENV.JWT_SECRET,
			{ expiresIn: "1d" },
		);


		res.cookie("token", token, {
			httpOnly: true,
			secure: ENV.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 24 * 60 * 60 * 1000, // 1day
		});

		res.status(200).json({
			message: "Login successful",
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
		});

	} catch (error) {
		next(error);
	}
};

export const getMe = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ message: "Fetched Successfully", data: user });
	} catch (error) {
		next(error);
	}
};

export const logout = async (req, res, next) => {
	try {
		const token = req.cookies.token;
		if (token) {
			await TokenBlackList.create({ token });
		}

		res.clearCookie("token", {
			httpOnly: true,
			secure: ENV.NODE_ENV === "production",
			sameSite: "lax",
		});
		res.status(200).json({ message: "Logged out" });
	} catch (error) {
		next(error);
	}
};

export const refreshToken = async (req, res, next) => {
	try {
		const token = req.cookies.refreshToken;
		if (!token) {
			return res.status(401).json({
				message: "Refresh token not found",
			});
		}
		const decoded = jwt.verify(token, ENV.JWT_SECRET);
		const accessToken = jwt.sign(
			{
				id: decoded.id,
			},
			ENV.JWT_SECRET,
			{ expiresIn: "15m" },
		);

		const newRefreshToken = jwt.sign(
			{
				id: decoded.id,
			},
			ENV.JWT_SECRET,
			{ expiresIn: "7d" },
		);

		res.cookie("refreshToken", newRefreshToken, {
			httpOnly: true,
			secure: ENV.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
		});

		res.status(200).json({
			message: "Access token refreshed Successfully",
			accessToken,
		});
	} catch (error) {
		next(error);
		return res.status(403).json({
			message: "Invalid or expired refresh token",
		});
	}
};
