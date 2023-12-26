import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
	name: String,
	id: String,
	users: [
		{
			spotifyId: String,
			name: String,
			image: {
				url: String,
				height: Number,
				width: Number
			},
			topTracks: {
				name: String,
				artist: String,
				images: [
					{
						url: String,
						height: Number,
						width: Number
					}
				]
			}
		}
	]
});

export default mongoose.model("Room", roomSchema);
