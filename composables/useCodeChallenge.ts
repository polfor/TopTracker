export default async function () {
	// Create a random string for the code verifier
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const values = crypto.getRandomValues(new Uint8Array(127));
	const codeVerifier = values.reduce(
		(acc, x) => acc + possible[x % possible.length],
		""
	);

	// Hash the code verifier
	const sha256 = await crypto.subtle.digest(
		"SHA-256",
		new TextEncoder().encode(codeVerifier)
	);

	// Encode the hash in base64
	const codeChallenge = btoa(String.fromCharCode(...new Uint8Array(sha256)))
		.replace(/=/g, "")
		.replace(/\+/g, "-")
		.replace(/\//g, "_");

	return { codeChallenge, codeVerifier };
}
