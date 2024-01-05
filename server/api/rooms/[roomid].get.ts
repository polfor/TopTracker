import Room from "@@/server/models/room";

export default defineEventHandler(async event => {
	try {
		const roomId = getRouterParam(event, "roomid");

		const room = await Room.findById(roomId);
		if (!room) {
			setResponseStatus(event, 404);
			return { error: "Room not found" };
		}
		return { room: room };
	} catch (error) {
		setResponseStatus(event, 500);
		return { error: error };
	}
});
