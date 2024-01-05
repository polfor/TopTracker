// room.test.ts
import { ofetch } from "ofetch";

const testingRoom = {
	name: "Unit Testing Room",
	roomCode: "unitTestingRoomCode",
	users: [
		{
			spotifyId: "unitTestingSpotifyId",
			name: "Unit Testing Spotify Id",
			image: {
				url: "http://example.com/image.jpg",
				height: 100,
				width: 100
			},
			topTracks: [
				{
					name: "Unit Testing Track",
					artist: "Unit Testing Artist",
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
};

let testingRoomId: string;

test("should save a room to db", async ({ expect }) => {
	const returnData = await ofetch("http://localhost:3000/api/rooms", {
		body: JSON.stringify(testingRoom),
		method: "POST"
	});

	expect(returnData).not.toBeNull();
	const foundRoom = returnData.room;
	testingRoomId = foundRoom._id;
	console.log(testingRoomId);

	expect(foundRoom).not.toBeNull();
	expect(foundRoom.name).toEqual(testingRoom.name);
	expect(foundRoom.roomCode).toEqual(testingRoom.roomCode);
	expect(foundRoom.users[0].spotifyId).toEqual(testingRoom.users[0].spotifyId);
	expect(foundRoom.users[0].name).toEqual(testingRoom.users[0].name);
});

test("should get a room from db", async ({ expect }) => {
	const returnData = await ofetch(
		`http://localhost:3000/api/rooms/${testingRoomId}`
	);

	expect(returnData).not.toBeNull();

	const foundRoom = returnData.room;

	expect(foundRoom).not.toBeNull();
	expect(foundRoom.name).toEqual(testingRoom.name);
	expect(foundRoom.roomCode).toEqual(testingRoom.roomCode);
	expect(foundRoom.users[0].spotifyId).toEqual(testingRoom.users[0].spotifyId);
	expect(foundRoom.users[0].name).toEqual(testingRoom.users[0].name);
});

test("should get all rooms assigned to a user", async ({ expect }) => {
	const returnData = await ofetch(
		`http://localhost:3000/api/rooms/user/${testingRoom.users[0].spotifyId}`
	);

	console.log(returnData);

	expect(returnData).not.toBeNull();
	expect(returnData.rooms.length).toBeGreaterThan(0);

	const foundRoom = returnData.rooms[0];

	expect(foundRoom).not.toBeNull();
	expect(foundRoom.name).toEqual(testingRoom.name);
	expect(foundRoom.roomCode).toEqual(testingRoom.roomCode);
	expect(foundRoom.users[0].spotifyId).toEqual(testingRoom.users[0].spotifyId);
	expect(foundRoom.users[0].name).toEqual(testingRoom.users[0].name);
});

test("should delete a room from db", async ({ expect }) => {
	const returnData = await ofetch(
		`http://localhost:3000/api/rooms/${testingRoomId}`,
		{
			method: "DELETE"
		}
	);

	expect(returnData).not.toBeNull();
	expect(returnData.deleted).toBeTruthy();
});
