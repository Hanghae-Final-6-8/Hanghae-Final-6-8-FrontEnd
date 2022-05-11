// eslint-disable-next-line
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    fontWeight: {
      400: 400,
      500: 500,
      700: 700,
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'NotoSansKR', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        0.5: '0.125rem',
        0.75: '0.1875rem',
        1.5: '0.375rem',
        2.5: '0.625rem',
        5.5: '1.375rem',
        '7px': '0.4375rem',
        34: '2.125rem',
        104: '6.5rem',
      },
      borderRadius: {
        40: '40px',
      },
      width: {
        30: '1.875rem',
      },
      height: {
        84: '5.25rem',
      },
      dropShadow: {
        main: '0 -4px 20 rgba(11,11,11,0.02)',
      },
    },
    fontSize: {
      head: ['22px', '26px'],
      sub: ['20px', '24px'],
      sub2: ['18px', '22px'],
      body: ['14px', '18px'],
      caption: ['12px', '16px'],
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
