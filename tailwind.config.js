/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: '#030918',
				secondary: '#F9FAFB',
				'secondary-dark': '#E5E7EB',
				'secondary-acc': '#6B7280',
				'acc-1': '#C27803',
				'acc-1-light': '#E3A008',
				'acc-1-dark': '#9F580A',
				'acc-2': '#046C4E',
				'acc-2-light': '#057A55',
				'acc-2-dark': '#03543F'
			}
		}
	},
	plugins: []
};
