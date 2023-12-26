// room.test.ts
import mongoose from "mongoose";
import Room from "../../../server/models/room";
import dotenv from "dotenv";

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

test("should save room to database", async ({ expect }) => {
	const room = new Room({
		name: "Test Room",
		roomCode: "Test Room Code",
		users: [
			{
				spotifyId: "Test ID",
				name: "Test User",
				image: {
					url: "http://example.com/image.jpg",
					height: 100,
					width: 100
				},
				topTracks: [
					{
						name: "Test Track",
						artist: "Test Artist",
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

	const foundRoom = await Room.findById(room.id);
	expect(foundRoom).not.toBeNull();
	expect(foundRoom?.name).toBe("Test Room");
});

test("should update room in database", async ({ expect }) => {
	const room = new Room({
		name: "Test Room",
		roomCode: "Test Room Code",
		users: [
			{
				spotifyId: "Test ID",
				name: "Test User",
				image: {
					url: "http://example.com/image.jpg",
					height: 100,
					width: 100
				},
				topTracks: [
					{
						name: "Test Track",
						artist: "Test Artist",
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

	room.name = "Updated Room";
	await room.save();

	const updatedRoom = await Room.findById(room.id);
	expect(updatedRoom).not.toBeNull();
	expect(updatedRoom?.name).toBe("Updated Room");
});

// Add more tests as needed...
