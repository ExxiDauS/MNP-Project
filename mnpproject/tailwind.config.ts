import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				custom: {
					background: {
						primary: '#000000',    // Main background color for the entire application
						surface: '#18181b',    // Background for cards, containers, and elevated elements
						elevated: '#27272a',   // Background for hoverable elements and higher elevation components
					},
					purple: {
						light: '#d8b4fe',      // Accent text, highlights, and interactive elements
						DEFAULT: '#9333ea',    // Primary buttons, active states, and key interactive elements
						dark: '#7e22ce',       // Hover states for primary buttons and active links
						deeper: '#581c87',     // Borders and subtle purple accents
					},
					text: {
						primary: '#fafafa',    // Main text color for headings and important content
						secondary: '#a1a1aa',  // Body text and less emphasized content
						subtle: '#52525b',     // Helper text, captions, and disabled states
					},
					status: {
						available: '#a855f7',  // Indicating available or active status
						limited: '#7e22ce',    // Warning or limited availability indicators
						soldout: '#52525b',    // Inactive or sold out states
					},
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-primary': 'linear-gradient(to bottom, rgb(88 28 135 / 0.5), rgb(0 0 0))',        // Hero sections and main content areas
				'gradient-horizontal': 'linear-gradient(to right, rgb(0 0 0), rgb(88 28 135 / 0.2))',      // Section dividers and horizontal transitions
				'gradient-card': 'linear-gradient(to bottom right, rgb(24 24 27 / 0.8), rgb(0 0 0))',      // Card backgrounds and hoverable elements
				'gradient-hover': 'linear-gradient(to bottom, rgb(147 51 234 / 0.1), rgb(88 28 135 / 0.2))'// Hover states for interactive elements
			},


		}
	},
	plugins: [
		require("tailwindcss-animate"),
		require('tailwind-scrollbar'),
	],

} satisfies Config;
