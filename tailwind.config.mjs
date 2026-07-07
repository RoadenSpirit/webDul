/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/preline/preline.js'
	],
	theme: {
		extend: {},
	},
	plugins: [
		daisyui
	],
}
