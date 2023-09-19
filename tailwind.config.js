/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        cream: "rgb(255, 248, 231)",
        "soft-gray": "rgb(192, 192, 192)",
        "navy-blue": "rgb(0, 0, 128)",
        black: "rgb(0, 0, 0)",
        "dark-purple": "rgb(48, 0, 48)",
        "darker-gold": "rgb(204, 153, 51)",
        "royal-blue": "rgb(0, 35, 102)",
      },
      textColor: {
        gold: "rgb(255, 215, 0)",
        "royal-blue": "rgb(0, 35, 102)",
      },
    },
  },
  plugins: [],
};
