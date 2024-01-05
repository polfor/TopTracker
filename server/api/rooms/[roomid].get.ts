import Room from "@@/server/models/room";

export default defineEventHandler(async event => {
	const roomId = getRouterParam(event, "roomid");

	const rooms = await Room.findById(roomId);

	return rooms;
});
