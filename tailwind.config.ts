import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#E53935",
        white: "#FFFFFF",
        black: "#111111",
        bgGray: "#F5F5F5",
        hoverGray: "#DDD",
        text: "#111111",
        accent: "#E53935",
        // Modern dark theme colors
        dark: {
          bg: "#0a0a0a",
          surface: "#111111",
          card: "#1a1a1a",
          border: "#2a2a2a",
          text: "#ffffff",
          textSecondary: "#a0a0a0",
          textMuted: "#666666",
          accent: "#E53935",
          accentHover: "#ff4444",
          glass: 'rgba(26, 26, 26, 0.8)',
          glassBorder: 'rgba(255, 255, 255, 0.1)',
        },
        glass: 'rgba(255,255,255,0.15)',
        glassBorder: 'rgba(255,255,255,0.25)',
        neonRed: '#e53935',
        neonRedGlow: 'rgba(229,57,53,0.6)',
        // Additional dark theme colors
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      fontFamily: {
        headline: ["Poppins", "sans-serif"],
        body: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.05)",
        'button-hover': '0 2px 8px rgba(229,57,53,0.10) inset',
        'dark-card': "0 4px 20px rgba(0,0,0,0.5)",
        'dark-card-hover': "0 8px 30px rgba(0,0,0,0.7)",
        'neon-red': '0 0 20px rgba(229,57,53,0.6)',
        'dark-glow': '0 0 30px rgba(229,57,53,0.3)',
      },
      borderRadius: {
        pill: "9999px",
        'glass': '1.5rem',
      },
      letterSpacing: {
        wide: '0.05em',
      },
      height: {
        btn: '48px',
      },
      backdropBlur: {
        glass: '16px',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        'dark-glass': 'linear-gradient(135deg, rgba(26,26,26,0.8) 0%, rgba(42,42,42,0.6) 100%)',
      },
    },
  },
  plugins: [],
}
export default config 