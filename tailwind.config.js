/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: {
          500: '#FF9933',
          600: '#E67E22',
          700: '#D35400',
        },
        gov: {
          blue: '#1E3A8A',
          navy: '#0F172A',
          green: '#138808',
          emerald: '#059669',
          light: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'card': '0 2px 12px 0 rgba(0, 0, 0, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 25px -5px rgba(19, 136, 8, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'tricolor': '0 4px 20px -2px rgba(255, 153, 51, 0.25)',
      }
    },
  },
  plugins: [],
}
