/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        neutral: {
          light: "#f0f1f3",
          "light-hover": "#e8eaed",
          "light-active": "#d0d3d9",
          normal: "#667085",
          "normal-hover": "#5c6578",
          "normal-active": "#525a6a",
          dark: "#4d5464",
          "dark-hover": "#3d4350",
          "dark-active": "#2e323c",
          darker: "#24272f",
        },

        green: {
          light: "#ebf0ec",
          "light-hover": "#e1e9e3",
          "light-active": "#c1d1c5",
          normal: "#386b45",
          "normal-hover": "#32603e",
          "normal-active": "#2d5637",
          dark: "#2a5034",
          "dark-hover": "#224029",
          "dark-active": "#19301f",
          darker: "#142518",
        },

        secondary: {
          "orange-50": "#fff6e6",
          "orange-100": "#ffe3b0",
          "orange-200": "#ffd68a",
          "orange-300": "#ffc354",
          "orange-400": "#ffb733",
          "orange-500": "#ffa500",
          "orange-600": "#e89600",
          "orange-700": "#b57500",
          "orange-800": "#8c5b00",
          "orange-900": "#6b4500",
        },

        info: {
          light: "#e6f6fe",
          "light-hover": "#d9f2fd",
          "light-active": "#b0e3fc",
          normal: "#00a6f4",
          "normal-hover": "#0095dc",
          "normal-active": "#0085c3",
          dark: "#007db7",
          "dark-hover": "#006492",
          "dark-active": "#004b6e",
          darker: "#003a55",
        },

        error: {
          light: "#ffeaeb",
          "light-hover": "#fedfe1",
          "light-active": "#febec1",
          normal: "#fb2c36",
          "normal-hover": "#e22831",
          "normal-active": "#c9232b",
          dark: "#bc2129",
          "dark-hover": "#971a20",
          "dark-active": "#711418",
          darker: "#580f13",
        },
      },
    },
  },
  plugins: [],
};
