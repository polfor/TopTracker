import User, { UserModelInterface } from "@@/server/models/user";

export default async function () {
	async function getUser(
		spotifyId: string
	): Promise<UserModelInterface | null> {
		const user = await User.findOne({ spotifyId });
		if (user) {
			return await checkRefresh(user);
		} else {
			return null;
		}
	}

	async function checkRefresh(
		user: UserModelInterface
	): Promise<UserModelInterface | null> {
		if (user.expiresAt < Date.now()) {
			await refreshToken(user);
		}
		return user;
	}

	async function refreshToken(user: UserModelInterface) {
		// refresh
		console.log(user);
	}

	return { getUser };
}
