<template>
	<div class="flex flex-col items-center justify-center py-16">
		<button
			class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full transition-colors"
			@click="sendBack">
			Send to back
		</button>
		<button
			class="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-full transition-colors"
			@click="getInfo">
			Get info
		</button>
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();

	const state = useCookie("state");

	const verifier = useCookie("code_verifier");

	const tokenCookie = useCookie("token", {
		sameSite: true,
		httpOnly: true
	});

	async function sendBack() {
		if (route.query.state === state.value) {
			const { token } = await $fetch("/api/users/login", {
				method: "POST",
				body: JSON.stringify({
					code: route.query.code,
					verifier: verifier.value
				})
			});

			if (token) {
				tokenCookie.value = token;
			}
		}
	}

	async function getInfo() {
		try {
			console.log(tokenCookie.value);
			const { data } = await $fetch("/api/users/info", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${tokenCookie.value}`
				}
			});

			console.log(data);
		} catch (error: unknown) {
			console.error(error);
		}
	}
</script>

<style></style>
