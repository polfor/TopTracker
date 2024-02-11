module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: "@typescript-eslint/parser",
		ecmaVersion: 2020,
		sourceType: "module"
	},
	extends: [
		"@nuxt",
		"plugin:@typescript-eslint/recommended",
		"plugin:vue/vue3-recommended",
		"prettier"
	],
	plugins: ["vue", "@typescript-eslint"],
	rules: {
		semi: ["error", "always"],
		quotes: ["error", "double"],
		"comma-dangle": ["error", "never"],
		"arrow-parens": ["error", "as-needed"],
		"linebreak-style": ["error", "unix"],
		"no-tabs": "off",
		indent: "off",
		"@typescript-eslint/indent": ["error", "tab"],
		"vue/html-closing-bracket-newline": ["error", { multiline: "never" }],
		"vue/html-indent": ["error", "tab"],
		"vue/script-indent": ["error", "tab", { baseIndent: 1 }],
		"vue/html-closing-bracket-spacing": "error"
	},
	overrides: [
		{
			files: ["*.vue"],
			rules: {
				indent: "off",
				"@typescript-eslint/indent": "off"
			}
		},
		{
			files: ["pages/**/*.vue"],
			rules: {
				"vue/multi-word-component-names": "off"
			}
		}
	]
};
