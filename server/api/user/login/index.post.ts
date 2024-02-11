import User from "@@/server/models/user";

export default defineEventHandler(async event => {
	try {
		const { code, verifier } = await readBody(event);

		const config = useRuntimeConfig();

		const { signToken } = await useJWT();

		const testbody = new URLSearchParams({
			code: code,
			client_id: config.public.spotifyClientId,
			grant_type: "authorization_code",
			code_verifier: verifier,
			redirect_uri: "http://localhost:3000/callback"
		});

		const { access_token, expires_in, refresh_token } = await $fetch(
			"https://accounts.spotify.com/api/token",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body: testbody
			}
		);

		const { id: spotifyId } = await $fetch("https://api.spotify.com/v1/me", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		});

		const existingUser = await User.findOne({ spotifyId: spotifyId });

		if (existingUser) {
			existingUser.accessToken = access_token;
			existingUser.expiresAt = new Date(Date.now() + expires_in * 1000);
			existingUser.refreshToken = refresh_token;
			await existingUser.save();
		} else {
			const newUser = new User({
				spotifyId: spotifyId,
				accessToken: access_token,
				expiresAt: new Date(Date.now() + expires_in * 1000),
				refreshToken: refresh_token
			});
			await newUser.save();
		}

		const token = signToken({ spotifyId });
		console.log("token: ", token);
	} catch (error) {
		console.log("error: ", error);
		setResponseStatus(event, 500);
		return { error: error };
	}
});
