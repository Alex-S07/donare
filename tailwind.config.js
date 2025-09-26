/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['Inter', 'system-ui', 'sans-serif'],
  			heading: ['Poppins', 'system-ui', 'sans-serif'],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
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
  			// Donare brand colors
  			donare: {
  				primary: 'hsl(var(--donare-primary))',
  				secondary: 'hsl(var(--donare-secondary))',
  				accent: 'hsl(var(--donare-accent))',
  				neutral: {
  					50: 'hsl(var(--donare-neutral-50))',
  					100: 'hsl(var(--donare-neutral-100))',
  					200: 'hsl(var(--donare-neutral-200))',
  					300: 'hsl(var(--donare-neutral-300))',
  					400: 'hsl(var(--donare-neutral-400))',
  					500: 'hsl(var(--donare-neutral-500))',
  					600: 'hsl(var(--donare-neutral-600))',
  					700: 'hsl(var(--donare-neutral-700))',
  					800: 'hsl(var(--donare-neutral-800))',
  					900: 'hsl(var(--donare-neutral-900))',
  				}
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(50px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'fade-in': {
  				'0%': { opacity: '0' },
  				'100%': { opacity: '1' }
  			},
  			'slide-in-left': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(-50px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'slide-in-right': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(50px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			'shimmer': {
  				'0%': { backgroundPosition: '-200px 0' },
  				'100%': { backgroundPosition: 'calc(200px + 100%) 0' }
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
  			'fade-in': 'fade-in 0.6s ease-out forwards',
  			'slide-in-left': 'slide-in-left 0.8s ease-out forwards',
  			'slide-in-right': 'slide-in-right 0.8s ease-out forwards',
  			'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'shimmer': 'shimmer 2s infinite'
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem',
  		},
  		backdropBlur: {
  			'nav': '12px',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
