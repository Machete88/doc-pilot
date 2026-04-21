/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        background: "#0f0f23",
        surface: "#1a1a2e",
        foreground: "#ffffff",
        muted: "#888888",
      },
    },
  },
  plugins: [],
};
