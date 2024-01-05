// room.test.ts
import mongoose from "mongoose";
import Room from "../../../../server/models/room";
import dotenv from "dotenv";
import { ofetch } from "ofetch";

dotenv.config();

const mongoUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/toptracker`;

beforeAll(async () => {
	try {
		await mongoose.connect(mongoUrl);
		console.log("DB connection established.");
	} catch (err) {
		console.error("DB connection failed.", mongoUrl);
	}
});

afterAll(async () => {
	await mongoose.disconnect();
});

test("should save a room and return it", async ({ expect }) => {
	const room = new Room({
		name: "Testing Get Room",
		roomCode: "Test Get Room Code",
		users: [
			{
				spotifyId: "Test Get ID",
				name: "Test Get User",
				image: {
					url: "http://example.com/image.jpg",
					height: 100,
					width: 100
				},
				topTracks: [
					{
						name: "Testing Get Track",
						artist: "Testing Get Artist",
						images: [
							{
								url: "http://example.com/track.jpg",
								height: 100,
								width: 100
							}
						]
					}
				]
			}
		]
	});
	await room.save();

	const foundRoom = await ofetch(`http://localhost:3000/api/rooms/${room.id}`);
	expect(foundRoom).not.toBeNull();
	expect(foundRoom.name).toEqual(room.name);
	expect(foundRoom.roomCode).toEqual(room.roomCode);
	expect(foundRoom.users[0].spotifyId).toEqual(room.users[0].spotifyId);
});
