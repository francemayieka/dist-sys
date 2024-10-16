module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all files for classes
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D4ED8", // Blue theme
          light: "#3B82F6",
          dark: "#1E40AF",
        },
      },
    },
  },
  plugins: [],
};
