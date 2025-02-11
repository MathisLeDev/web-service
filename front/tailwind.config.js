/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fontInactive: "#7E7E7E",
        menuBorder: "#313034",
        warning: "#FDA800FF",
        success: "#7EEB00FF",
        customWhiteForBG: "#f5f6f8",
        customCyan: "#0fc0d9",
        customBlue: "#109ec7",
        customPink: "#ed2a6d",
        customPurple: "#771c50",
        customOrange: "#ee8c18",
        customDark: "#1D1D1D",
        customGreen: "#21d072",
        customRed: "#f41917",
        customLighterNeonPurple: "#a104f3",
        customNeonPurple: "#5c02b5",
        customYellow: "#FFA840",
        customLightGray: "#F7F7FA",
        customGray: "#c9c9c9",
      },
    },
  },
  plugins: [require("daisyui")],
};
