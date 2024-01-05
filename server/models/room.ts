import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	roomCode: {
		type: String,
		required: true
	},
	users: [
		{
			spotifyId: {
				type: String,
				required: true
			},
			name: {
				type: String,
				required: true
			},
			image: {
				url: String,
				height: Number,
				width: Number
			},
			topTracks: [
				{
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
			]
		}
	]
});

export default mongoose.model("Room", roomSchema);
