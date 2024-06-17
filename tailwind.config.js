/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "text-red-800",
    "bg-red-200",
    "bg-red-800",
    "text-red-100",
    "ring-red-300",
    "text-yellow-800",
    "bg-yellow-200",
    "bg-yellow-800",
    "text-yellow-100",
    "ring-yellow-300",
    "text-blue-800",
    "bg-blue-200",
    "bg-blue-800",
    "text-blue-100",
    "ring-blue-300",
    "text-green-800",
    "bg-green-200",
    "bg-green-800",
    "text-green-100",
    "ring-green-300",
    "text-cyan-800",
    "bg-cyan-200",
    "bg-cyan-800",
    "text-cyan-100",
    "ring-cyan-300",
    "text-pink-800",
    "bg-pink-200",
    "bg-pink-800",
    "text-pink-100",
    "ring-pink-300",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        nav: "#f4f4f4",
        navHead: "#8c9097",
      },
      fontFamily: {
        deca: ["Lexend Deca", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
