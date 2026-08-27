export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Base oscura de la app
        ink: {
          950: '#070A14',
          900: '#0B1020',
          800: '#121A31',
          700: '#1B2544',
          600: '#27345C',
          500: '#3A4A7A',
        },
        // Acentos de marca
        brand: {
          cyan: '#22D3EE',
          violet: '#A78BFA',
          pink: '#E879F9',
          amber: '#FBBF24',
        },
      },
      fontFamily: {
        display: ['"Baloo 2"', '"Trebuchet MS"', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(24px, -32px) scale(1.08)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.94)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        blob: 'blob 18s ease-in-out infinite',
        floaty: 'floaty 4s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};
