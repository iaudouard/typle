/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "1/2": "50%",
        "2/3": "66.666667%",
      },
    },
  },
  plugins: [],
};
