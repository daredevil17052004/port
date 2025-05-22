export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: "var(--font-geist-sans)",
				mono: "var(--font-geist-mono)",
				arimo: "var(--font-arimo)",
				chakra: "var(--font-chakra)",
			},
			colors: {
				'text': 'var(--text)',
				'background': 'var(--background)',
				'primary': 'var(--primary)',
				'secondary': 'var(--secondary)',
				'accent': 'var(--accent)',
				'glitch1': 'var(--glitch1)',
				'glitch2': 'var(--glitch2)',
				'glitch3': 'var(--glitch3)',
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			animation: {
				shimmer: "shimmer 2s linear infinite",
				// scroll: 'scroll 30s linear infinite',
				shine: 'shine 5s linear infinite',
				marquee: "marquee 30s linear infinite",
			},
			keyframes: {
				shimmer: {
					from: {
						"backgroundPosition": "0 0"
					},
					to: {
						"backgroundPosition": "-200% 0"
					}
				},
				shine: {
					'0%': { 'background-position': '100%' },
					'100%': { 'background-position': '-100%' },
				},
				marquee: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-50%)" },
				  },
				// scroll: {
				// 	'0%': { transform: 'translateX(100%)' },
				// 	'100%': { transform: 'translateX(-100%)' },
				//   },
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
