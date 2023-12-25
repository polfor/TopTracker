// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
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
	css: ["~/assets/css/main.css"]
});
