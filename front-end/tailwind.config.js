/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#1E1E1E",
				secondary: "#757575",
				blackBG: "#F5F5F5",
			},
			fontFamily: {
				primary: ["Poppins", "serif"],
				secondary: ["Abel", "serif"],
			},
		},
	},
	plugins: [],
};
