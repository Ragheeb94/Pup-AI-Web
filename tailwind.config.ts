import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F59E0B',
        'primary-dark': '#D97706',
        'primary-light': '#FEF3C7',
        surface: '#F9FAFB',
        border: '#E5E7EB',
        'text-secondary': '#6B7280',
        'text-tertiary': '#9CA3AF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
}

export default config
