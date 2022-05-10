// eslint-disable-next-line
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    borderRadius: {
      40: '40px',
    },
    extend: {
      fontFamily: {
        sans: ['Roboto', 'NotoSansKR', ...defaultTheme.fontFamily.sans],
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
  plugins: [],
};
