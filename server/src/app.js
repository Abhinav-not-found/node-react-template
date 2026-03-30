import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import ENV from "./lib/env.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
	cors({
		origin: ENV.CLIENT_URL,
		credentials: true,
	}),
);

app.get("/api/check", (req, res) => {
	res.send("API running");
});

app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(err.statusCode || 500).json({
		message: err.message || "Internal Server Error",
	});
});

export default app;
