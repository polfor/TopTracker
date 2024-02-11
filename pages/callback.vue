<template>
	<div class="flex flex-col items-center justify-center py-16">
		<button
			class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full transition-colors"
			@click="sendBack">
			Send to back
		</button>
	</div>
</template>

<script lang="ts" setup>
	const route = useRoute();

	const state = useCookie("state");

	const verifier = useCookie("code_verifier");

	async function sendBack() {
		if (route.query.state === state.value) {
			await useFetch("/api/user/login", {
				method: "POST",
				body: JSON.stringify({
					code: route.query.code,
					verifier: verifier.value
				})
			});
		}
	}
</script>

<style></style>
