<template>
	<div class="flex flex-col items-center justify-center py-16">
		<button
			class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-full transition-colors">
			Login
		</button>
	</div>
</template>

<script lang="ts" setup>
	const config = useRuntimeConfig();

	const clientId = config.public.spotifyClientId;

	console.log(clientId);
</script>
