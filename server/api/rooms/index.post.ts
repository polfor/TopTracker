import Room from "@@/server/models/room";
import mongoose from "mongoose";

export default defineEventHandler(async event => {
	try {
		const roomData = await readBody(event);

		const newRoom = new Room(roomData);
		console.log(roomData);
		await newRoom.save();

		setResponseStatus(event, 200);
		return { room: newRoom };
	} catch (error) {
		if (error instanceof mongoose.Error.ValidationError) {
			setResponseStatus(event, 400);
			return { error: error };
		}
		setResponseStatus(event, 500);
		return { error: error };
	}
});
