import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
	spotifyId: {
		type: String,
		required: true,
		unique: true
	},
	accessToken: {
		type: String,
		required: true
	},
	refreshToken: {
		type: String,
		required: true
	},
	expiresAt: {
		type: Date,
		required: true
	}
});

export default mongoose.model("User", userSchema);
