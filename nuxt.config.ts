// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
	devtools: {
		enabled: true
	},
	alias: {
		"@": resolve(__dirname, "/")
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {}
		}
	},
	runtimeConfig: {
		mongoUrl: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/toptracker`,
		public: {
			spotifyClientId: "",
			spotifyClientSecret: ""
		}
	},
	nitro: {
		plugins: ["~/server/index.ts"]
	},
	css: ["~/assets/css/main.css"]
});
