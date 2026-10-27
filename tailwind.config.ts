import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          950: "#0B0C0A",
          900: "#111210", // Primary deep charcoal bg
          850: "#151614",
          800: "#191A17", // Secondary surface
          750: "#1D1E1B",
          700: "#20211D", // Elevated surface
          650: "#262723",
          600: "#2E2F2A",
          500: "#45463F",
          400: "#6F6E65",
          300: "#A5A398", // Secondary warm muted text
          200: "#C8C5B9",
          100: "#E3DFD4",
          50: "#F2EFE6", // Warm ivory primary text
        },
        sand: {
          50: "#FAF7F2",
          100: "#F4EFE6",
          200: "#E8DDCB",
          300: "#D7C5A3", // Accent soft beige
          400: "#C4AC84",
          500: "#A88F64",
          600: "#86704B",
          700: "#665439",
          800: "#473B29",
          900: "#2A2318",
        },
        editorial: {
          gov: "#3D7A5A",
          govSubtle: "#1C3627",
          opp: "#B8863A",
          oppSubtle: "#3B2B13",
          neutral: "#455461",
          gold: "#D4AF37",
          crimson: "#9B3838",
          cobalt: "#37618E",
          emerald: "#2D7252",
          violet: "#6A5389",
        },
      },
      borderRadius: {
        "card": "20px",
        "card-lg": "24px",
        "card-sm": "14px",
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.35)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.45)",
        glow: "0 0 25px -5px rgba(215, 197, 163, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
