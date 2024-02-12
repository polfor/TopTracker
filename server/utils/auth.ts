export default async function () {
	async function checkAuth(inputEvent) {
		const { decodeToken } = await useJWT();
		if (inputEvent.context.path != "/users/login") {
			if (!inputEvent.req.headers.authorization) {
				return null;
			}
			if (inputEvent.req.headers.authorization.split(" ")[0] !== "Bearer") {
				return null;
			}
			if (!inputEvent.req.headers.authorization.split(" ")[1]) {
				return null;
			}
			const token = inputEvent.req.headers.authorization.split(" ")[1];

			const decodedPayload = decodeToken(token);

			if (!decodedPayload) {
				return null;
			}

			console.log("decodedPayload: ", decodedPayload);

			const spotifyId = decodedPayload.spotifyId;

			return spotifyId;
		}
	}

	return { checkAuth };
}
