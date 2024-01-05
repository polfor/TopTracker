import Room from "@@/server/models/room";

export default defineEventHandler(async event => {
	const roomId = getRouterParam(event, "roomid");

	const rooms = await Room.findByIdAndDelete(roomId);
	if (!rooms) {
		setResponseStatus(event, 404);
		return { deleted: false };
	}
	return { deleted: true };
});
