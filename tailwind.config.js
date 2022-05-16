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
    fontSize: {
      head: ['22px', '26px'],
      subH33: ['20px', '33px'],
      sub: ['20px', '24px'],
      sub2: ['18px', '22px'],
      body: ['14px', '18px'],
      caption: ['12px', '16px'],
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
        '9px': '0.5625rem',
        '30px': '1.875rem',
        '34px': '2.125rem',
        '50px': '3.125rem',
        '60px': '3.75rem',
        '84px': '5.25rem',
        '104px': '6.5rem',
        '120px': '7.5rem',
        '200px': '12.5rem',
        '289px': '18.0625rem',
      },
      borderRadius: {
        '36px': '2.25rem',
        '40px': '2.5rem',
        btn: '0.875rem',
      },
      boxShadow: {
        main: '0 -4px 20px rgba(11, 11, 11, 0.02)',
        loginBtn: '0px 10px 30px rgba(11, 11, 11, 0.04)',
        toolbar: '0px -4px 30px rgba(11, 11, 11, 0.06)',
        contents: '0px 10px 20px rgba(11, 11, 11, 0.04)',
        contentsCoffee: '0px 5px 40px rgba(11, 11, 11, 0.12)',
        contentsStore: '0px 6px 20px rgba(11, 11, 11, 0.08)',
      },
      colors: {
        gray90: '#111111',
        gray80: '#676767',
        gray60: '#a1a1a1',
        gray30: '#dbdbdb',
        gray20: '#f6f6f6',
        red60: '#d5331f',
        brownS02: '#6d4937',
        brownS03: '#f5e9df',
        white: '#ffffff',
      },
      backgroundImage: {
        brownP: "url('/src/assets/backgrounds/brownP.svg')",
        brownS01: "url('/src/assets/backgrounds/brownS01.svg')",
        brownS01bg: "url('/src/assets/backgrounds/brownS01bg.svg')",
        basicBg: "url('/src/assets/backgrounds/basicBg.svg')",
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
