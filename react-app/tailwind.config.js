/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: "tw-",
  important: true,
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   white: "#F4F4F4",
      //   red: "#ea373d",
      //   delete: "#FF4136",
      //   teal: "#2A9D8F",
      //   blue: "#007bff",
      //   lightgrey: "#CBCBCB",
      //   grey: "#505050",
      //   black: "#1A1A1D",
      //   yellow: "#FFD166",
      //   green: "#4BB543",
      // },
    },
  },
  plugins: [require("daisyui")],
};
