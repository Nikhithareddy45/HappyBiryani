/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        regular: ["OPPOSans"],
        bold: ["OPPOSansBold"], 
        medium: ["OPPOSansMedium"],
        light: ["OPPOSansLight"],
        heavy: ["OPPOSansHeavy"],
      },
      colors: {
        primary: "#ac1e24",
        secondary:  "#d38f07ff",
        background: "#f9fafb",
        ash:"#716e6e34"
      },
    },
  },
  plugins: [],
}