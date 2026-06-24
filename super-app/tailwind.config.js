/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "neon-green":  "#39ff14",
        "neon-pink":   "#ff006e",
        "neon-orange": "#ff6b00",
        "neon-purple": "#7b2fff",
        "neon-yellow": "#ffd700",
        "bg-primary":  "#0d0d0d",
        "bg-secondary":"#111120",
        "bg-card":     "#16213e",
        "bg-card2":    "#1f1f3a",
        "border-dark": "#2a2a4a",
      },
    },
  },
  plugins: [],
};