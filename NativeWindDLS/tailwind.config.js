/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563EB',
          secondary: '#9333EA',
          success: '#16A34A',
          danger: '#DC2626',
        },
      },
      spacing: {
        'dls-1': 4,
        'dls-2': 8,
        'dls-3': 12,
        'dls-4': 16,
        'dls-5': 24,
        'dls-6': 32,
      },
      borderRadius: {
        dls: 12,
      },
    },
  },
  plugins: [],
};
