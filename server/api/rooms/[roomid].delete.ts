import Room from "@@/server/models/room";

export default defineEventHandler(async event => {
	const roomId = getRouterParam(event, "roomid");

	const room = await Room.findByIdAndDelete(roomId);
	if (!room) {
		setResponseStatus(event, 404);
		return { deleted: false };
	}

	return { deleted: true };
});
