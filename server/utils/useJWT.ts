import jwt from "jsonwebtoken";

export default async function () {
	function signToken(payload: object) {
		const config = useRuntimeConfig();
		console.log("jwtSecret: ", config.jwtSecret);
		return jwt.sign(payload, config.jwtSecret, {
			expiresIn: "6h"
		});
	}

	function decodeToken(token: string) {
		const config = useRuntimeConfig();
		try {
			const payload = jwt.verify(token, config.jwtSecret);
			return payload;
		} catch (err) {
			console.error("Invalid token", err);
			return null;
		}
	}

	return { signToken, decodeToken };
}
