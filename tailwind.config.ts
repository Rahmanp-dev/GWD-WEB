import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class', "class"],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			white: '#FFFFFF',
  			black: '#111111',
  			bgGray: '#F5F5F5',
  			hoverGray: '#DDD',
  			text: '#111111',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			dark: {
  				bg: '#0a0a0a',
  				surface: '#111111',
  				card: '#1a1a1a',
  				border: '#2a2a2a',
  				text: '#ffffff',
  				textSecondary: '#a0a0a0',
  				textMuted: '#666666',
  				accent: '#E53935',
  				accentHover: '#ff4444',
  				glass: 'rgba(26, 26, 26, 0.8)',
  				glassBorder: 'rgba(255, 255, 255, 0.1)'
  			},
  			glass: 'rgba(255,255,255,0.15)',
  			glassBorder: 'rgba(255,255,255,0.25)',
  			neonRed: '#e53935',
  			neonRedGlow: 'rgba(229,57,53,0.6)',
  			gray: {
  				'50': '#f9fafb',
  				'100': '#f3f4f6',
  				'200': '#e5e7eb',
  				'300': '#d1d5db',
  				'400': '#9ca3af',
  				'500': '#6b7280',
  				'600': '#4b5563',
  				'700': '#374151',
  				'800': '#1f2937',
  				'900': '#111827',
  				'950': '#030712'
  			},
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
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
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
  			}
  		},
  		fontFamily: {
  			headline: [
  				'Poppins',
  				'sans-serif'
  			],
  			body: [
  				'Montserrat',
  				'sans-serif'
  			]
  		},
  		boxShadow: {
  			card: '0 4px 12px rgba(0,0,0,0.05)',
  			'button-hover': '0 2px 8px rgba(229,57,53,0.10) inset',
  			'dark-card': '0 4px 20px rgba(0,0,0,0.5)',
  			'dark-card-hover': '0 8px 30px rgba(0,0,0,0.7)',
  			'neon-red': '0 0 20px rgba(229,57,53,0.6)',
  			'dark-glow': '0 0 30px rgba(229,57,53,0.3)'
  		},
  		borderRadius: {
  			pill: '9999px',
  			glass: '1.5rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		letterSpacing: {
  			wide: '0.05em'
  		},
  		height: {
  			btn: '48px'
  		},
  		backdropBlur: {
  			glass: '16px'
  		},
  		backgroundImage: {
  			'dark-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
  			'dark-glass': 'linear-gradient(135deg, rgba(26,26,26,0.8) 0%, rgba(42,42,42,0.6) 100%)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
export default config 