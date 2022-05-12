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
        // 375x812 기준
        // px: 'rem변환 수치'
        '7px': '0.4375rem',
        '34px': '2.125rem',
        '50px': '3.125rem',
        '60px': '3.75rem',
        '104px': '6.5rem',
        '120px': '7.5rem',
      },
      borderRadius: {
        '40px': '2.5rem',
        btn: '0.875rem',
      },
      width: {
        '30px': '1.875rem',
      },
      height: {
        '84px': '5.25rem',
      },
      dropShadow: {
        main: '0 -4px 20 rgba(11,11,11,0.02)',
        loginBtn: '0 10px 30 rgba(11, 11, 11, 0.04)',
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
