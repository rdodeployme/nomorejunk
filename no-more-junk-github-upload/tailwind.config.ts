import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        panel: "#111111",
        pulse: "#00ed00",
        mist: "#f3f3f3",
        muted: "#b8b8b8",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        lift: "0 24px 80px rgba(0, 0, 0, 0.16)",
        glow: "0 0 0 1px rgba(0, 237, 0, 0.34), 0 18px 70px rgba(0, 237, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
