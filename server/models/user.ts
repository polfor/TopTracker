import mongoose, { Document, Schema } from "mongoose";

interface IUser {
	spotifyId: string;
	accessToken: string;
	refreshToken: string;
	expiresAt: Date;
}

interface UserModelInterface extends IUser, Document {}

const userSchema = new Schema<UserModelInterface>({
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

export default mongoose.model<UserModelInterface>("User", userSchema);
