/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        arctic: "#F1F6F4",      // light background
        mint: "#D9E8E2",        // secondary light bg / cards
        forsythia: "#FFC801",   // primary accent (CTA, highlights)
        saffron: "#FF9932",     // secondary accent (gradients)
        nocturnal: "#114C5A",   // dark teal (text on light, headers)
        noir: "#172B36",        // darkest (dark sections, footer)
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
