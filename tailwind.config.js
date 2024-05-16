const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBlack: "rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
});
