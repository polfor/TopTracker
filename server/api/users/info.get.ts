import { UserModelInterface } from "@@/server/models/user";

export default defineEventHandler(async event => {
	const { checkAuth } = await auth();
	const { getUser } = await spotify();

	const spotifyId = await checkAuth(event);

	const user: UserModelInterface = await getUser(spotifyId);
	console.log("user: ", user);
});
