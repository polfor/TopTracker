import Room from "@@/server/models/room";

export default defineEventHandler(async () => {
	const rooms = await Room.find();

	return rooms;
});
