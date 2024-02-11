<template>
	<div class="flex flex-col items-center justify-center py-16">
		<button
			class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full transition-colors"
			@click="login">
			Login
		</button>
	</div>
</template>

<script setup lang="ts">
	const config = useRuntimeConfig();

	async function login() {
		const { codeChallenge, codeVerifier } = await useCodeChallenge();

		const verifier = useCookie("code_verifier");
		verifier.value = codeVerifier;

		const state = useCookie("state");
		state.value = state.value || Math.random().toString(36).substring(7);

		const params = {
			response_type: "code",
			client_id: config.public.spotifyClientId,
			code_challenge_method: "S256",
			code_challenge: codeChallenge,
			state: state.value,
			redirect_uri: "http://localhost:3000/callback"
		};

		const url = new URL("https://accounts.spotify.com/authorize");

		url.search = new URLSearchParams(params).toString();

		window.location.href = url.toString();
	}
</script>
