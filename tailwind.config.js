/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			translate: {
				"-0": "-0%",
				"-50": "-50%",
			},
		},
	},
	plugins: [require("daisyui")],

	daisyui: {
		styled: true,
		themes: [
			{
				mytheme: {
					primary: "#E0F1EB",
					secondary: "#2C3E63",
					"secondary-hover": "#25365b",
					accent: "#EF614F",
					neutral: "#3d4451",
					"base-100": "#ffffff",
					sidebar: "#1A1C1E",
					footer: "#191919",
				},
				fontFamily: {
					nunito: ["inter", "sans-serif"],
				},
			},
		],
		base: false,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "",
		darkTheme: "light",
	},
};
