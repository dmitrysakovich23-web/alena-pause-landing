import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        milk: "#f4efe8",
        ink: "#161412",
        muted: "#756d66",
        burgundy: "var(--color-wine)",
        wine: "var(--color-wine)",
        "wine-dark": "var(--color-wine-dark)",
        "wine-black": "var(--color-wine-black)",
        "wine-panel": "var(--color-wine-panel)",
        paper: "#fbf8f3",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(34, 24, 20, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
