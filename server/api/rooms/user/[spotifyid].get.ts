import Room from "@@/server/models/room";

export default defineEventHandler(async event => {
	const spotifyId = getRouterParam(event, "spotifyid");

	const rooms = await Room.find({ "users.spotifyId": spotifyId });

	return { rooms: rooms };
});
