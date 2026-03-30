import mongoose from "mongoose";

const BlackListTokenSchema = new mongoose.Schema(
	{
		token: {
			type: String,
			required: [true, "Token is required"],
			index: true,
			unique: true,
		},
	},
	{
		timestamps: true,
	},
);
// automatically delete the token after 24 hours
BlackListTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // 24 hours

const TokenBlackList = mongoose.model("blackListToken", BlackListTokenSchema);

export default TokenBlackList;
