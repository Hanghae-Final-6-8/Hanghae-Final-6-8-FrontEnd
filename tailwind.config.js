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
      head: ['22px', '34px'],
      subH33: ['20px', '33px'],
      sub: ['20px', '30px'],
      sub2: ['18px', '28px'],
      body: ['14px', '22px'],
      caption: ['12px', '18px'],
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
        '26px': '1.625rem',
        '30px': '1.875rem',
        '34px': '2.125rem',
        '50px': '3.125rem',
        '60px': '3.75rem',
        '72px': '4.5rem',
        '84px': '5.25rem',
        '90px': '5.625rem',
        '100px': '6.25rem',
        '104px': '6.5rem',
        '120px': '7.5rem',
        '152px': '9.5rem',
        '172px': '10.75rem',
        '180px': '11.25rem',
        '200px': '12.5rem',
        '227px': '14.1875rem',
        '289px': '18.0625rem',
      },
      borderRadius: {
        '22px': '1.375rem',
        '30px': '1.875rem',
        '36px': '2.25rem',
        '40px': '2.5rem',
        btn: '0.875rem',
      },
      boxShadow: {
        main: '0 -4px 20px rgba(17, 17, 17, 0.02)',
        loginBtn: '0px 10px 30px rgba(17, 17, 17, 0.04)',
        toolbar: '0px -4px 30px rgba(17, 17, 17, 0.06)',
        contents: '0px 10px 20px rgba(17, 17, 17, 0.04)',
        contentsCoffee: '0px 5px 40px rgba(17, 17, 17, 0.12)',
        contentsStore: '0px 6px 20px rgba(17, 17, 17, 0.08)',
        tasteBrown: '0px 10px 20px rgba(62, 37, 37, 0.14)',
        con14: '0px 10px 20px rgba(17, 17, 17, 0.14)',
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
      textUnderlineOffset: {
        10: 14,
      },
      backgroundImage: {
        brownP: "url('/src/assets/backgrounds/brownNoise.jpg')",
        brownS01: "url('/src/assets/backgrounds/brownS01.svg')",
        brownS01bg: "url('/src/assets/backgrounds/beigeNoise.jpg')",
        basicBg: "url('/src/assets/backgrounds/basicBg.svg')",
        defaultBg01: "url('/src/assets/backgrounds/default_back01.jpg')",
        defaultBg02: "url('/src/assets/backgrounds/default_back02.jpg')",
        defaultBg03: "url('/src/assets/backgrounds/default_back03.jpg')",
        defaultBg04: "url('/src/assets/backgrounds/default_back04.jpg')",
        defaultBg05: "url('/src/assets/backgrounds/default_back05.jpg')",
        mainBrownBg: "url('/src/assets/backgrounds/mainBrownBg.svg')",
        cardImg01: "url('/src/assets/images/cardImg001.png')",
        cardImg02: "url('/src/assets/images/cardImg002.png')",
        cardImg03: "url('/src/assets/images/cardImg03.png')",
      },
      brightness: {
        bg: '.40',
      },
      animation: {
        fadeIn: 'fadeIn 0.8s',
        scrollUp: 'scrollUp 0.6s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0.8, transform: 'translate3d(0, 20%, 0)' },
          '100%': { opacity: 1, transform: 'translateZ(0)' },
        },
        scrollUp: {
          '0%': { opacity: 1, transform: 'translate3d(0, 100%, 0)' },
          '100%': { opacity: 1, transform: 'translateZ(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
